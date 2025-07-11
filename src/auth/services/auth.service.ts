import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
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
import {
  StudentAdapter,
  StudentResponseAdapter,
} from '../data/adapters/student.adapter';
import { DisabilityRepositoryImp } from 'src/disability/data/repositories/Disability.repository.imp';
import { DisabilityRepositoryI } from 'src/disability/domain/repositories/Disability.repository';
import { CreateStudentDisabilityDto } from 'src/disability/data/dtos/create-student-disability.dto';
import { LoginStudentDto } from '../data/dtos/login-student-dto';
import { RpcException } from '@nestjs/microservices';

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
    @Inject(DisabilityRepositoryImp)
    private readonly _disabilityRepository: DisabilityRepositoryI,
  ) {}

  async registerStudent(
    userDto: CreateStudentDto,
  ): Promise<RegisterStudentResponseAdapter> {
    try {
      const studentEntity = StudentMapper.toEntity(userDto);
      const student = await this._studentRepository.create(studentEntity);
      let payload = TokenPayloadAdapter.fromStudentToEntity(student);
      if (userDto?.disability_name) {
        const disabilityPayload: CreateStudentDisabilityDto = {
          student_id: payload.id,
          disability_name: userDto.disability_name,
        };
        const disabilityRes =
          await this._disabilityRepository.create(disabilityPayload);
        payload = {
          ...payload,
          disability: disabilityRes.id_disability.name,
        };
      }
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
        this._httpService
          .post('/api/cloudinary/upload', formData, {
            headers: {
              ...formData.getHeaders(),
            },
          })
          .pipe(
            catchError((error) => {
              this.logger.error(error);
              throw new RpcException(error);
            }),
          ),
      );
      const qrImageUrl = uploadResponse.data.data.url;
      await this._studentRepository.updateQrPath(student.id, qrImageUrl);

      this.logger.log(
        `Image uploaded successfully ${qrImageUrl} for student ${student.id}`,
      );
      return new RegisterStudentResponseAdapter(qrImageUrl, encryptedToken);
    } catch (error) {
      this.logger.error(error);
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async loginStudent(
    loginStudentDto: LoginStudentDto,
  ): Promise<LoginStudentResponseAdapter> {
    try {
      const decryptedToken = await this._encryptDataRepository.decrypt(
        loginStudentDto.tokenEncode,
      );
      const {
        iat: _,
        exp,
        ...userPayload
      } = this._jwtService.decode(decryptedToken);

      return new LoginStudentResponseAdapter(decryptedToken, userPayload);
    } catch (error) {
      this.logger.error(error);
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async getAllStudents(
    query: GetAllStudentsQueryDto,
  ): Promise<StudentResponseAdapter> {
    try {
      const students = await this._studentRepository.findAll(query);
      if (students.length === 0) {
        throw new RpcException({
          status: HttpStatus.NO_CONTENT,
          message: 'No students found',
        });
      }
      const disabilities =
        await this._disabilityRepository.getAllWithStudents();
      const studentsAdapter = students.map((student) => {
        const disability =
          disabilities.filter((d) => d.id_student.id === student.id)[0] ?? null;
        return new StudentAdapter(student, disability?.id_disability?.name);
      });
      return new StudentResponseAdapter(studentsAdapter);
    } catch (error) {
      this.logger.error(error);
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }
}
