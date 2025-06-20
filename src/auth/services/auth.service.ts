import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as FormData from 'form-data';
import { CreateStudentDto } from '../data/dtos/create-student.dto';
import { StudentMapper } from '../data/mappers/student.mapper';
import {
  EncryptDataRepository,
  QRRepository,
  StudentRepositoryI,
} from '../domain/repositories';
import { base64ToBuffer } from 'src/common/utils/base64ToBuffer';
import {
  EncryptDataRepositoryImp,
  QRRepositoryImp,
  StudentRepositoryImp,
} from '../data/repositories';
import {
  LoginStudentResponseAdapter,
  RegisterStudentResponseAdapter,
  TokenPayloadAdapter,
} from '../data/adapters';
import { GetAllStudentsQueryDto } from '../data/dtos/get-all-students.dto';
import { HttpStatusCode } from 'axios';
import {
  StudentAdapter,
  StudentResponseAdapter,
} from '../data/adapters/student.adapter';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _httpService: HttpService,
    @Inject(EncryptDataRepositoryImp)
    private readonly _encryptDataRepository: EncryptDataRepository,
    @Inject(QRRepositoryImp)
    private readonly _qrRepository: QRRepository,
    @Inject(StudentRepositoryImp)
    private readonly _studentRepository: StudentRepositoryI,
  ) {}

  async registerStudent(
    userDto: CreateStudentDto,
  ): Promise<RegisterStudentResponseAdapter> {
    try {
      const studentEntity = StudentMapper.toEntity(userDto);
      const student = await this._studentRepository.create(studentEntity);
      const payload = TokenPayloadAdapter.fromStudentToEntity(student);
      const token = this._jwtService.sign({ ...payload });
      const encryptedToken = this._encryptDataRepository.encrypt(token);
      const qrImageBase64 = await this._qrRepository.generateQR(encryptedToken);

      const qrCodeBuffer = base64ToBuffer(qrImageBase64);

      const formData = new FormData();
      const fileName = `${student.id}-qr.png`;
      formData.append('file', qrCodeBuffer, { filename: fileName });
      formData.append('fileName', fileName);
      formData.append('folder', 'qr-images');

      const uploadResponse = await firstValueFrom(
        this._httpService.post('/api/cloudinary/upload', formData, {
          headers: {
            ...formData.getHeaders(),
          },
        }),
      );

      this.logger.log('Image uploaded successfully');
      return new RegisterStudentResponseAdapter(
        uploadResponse.data,
        encryptedToken,
      );
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async loginStudent(
    imageBuffer: Buffer,
  ): Promise<LoginStudentResponseAdapter> {
    try {
      const encryptedToken = await this._qrRepository.readQR(imageBuffer);
      const decryptedToken =
        await this._encryptDataRepository.decrypt(encryptedToken);
      const {
        iat: _,
        exp,
        ...userPayload
      } = this._jwtService.decode(decryptedToken);

      return new LoginStudentResponseAdapter(decryptedToken, userPayload);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async getAllStudents(
    query: GetAllStudentsQueryDto,
  ): Promise<StudentResponseAdapter> {
    try {
      const students = await this._studentRepository.findAll(query);
      if (students.length === 0) {
        throw new HttpException('No students found', HttpStatusCode.NoContent);
      }
      const studentsAdapter = students.map(
        (student) => new StudentAdapter(student),
      );
      return new StudentResponseAdapter(studentsAdapter);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
