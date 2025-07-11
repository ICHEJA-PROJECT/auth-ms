import {
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentRepositoryI } from 'src/auth/domain/repositories/Student.repository';
import { StudentEntity } from '../entities/Student.entity';
import { Repository } from 'typeorm';
import { StudentI } from 'src/auth/domain/entitiesI';
import { Student } from 'src/auth/domain/entities/student.entity';
import { GetAllStudentsQueryDto } from '../dtos/get-all-students.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class StudentRepositoryImp implements StudentRepositoryI {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,
  ) {}

  async create(student: Student): Promise<StudentI> {
    try {
      const newStudent = this.studentRepository.create(student);
      return this.studentRepository.save(newStudent);
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }

  async updateQrPath(id: number, qrPath: string): Promise<void> {
    try {
      await this.studentRepository.update(id, { qr_path: qrPath });
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }

  async findAll(query: GetAllStudentsQueryDto): Promise<StudentI[]> {
    try {
      const { page = 1, limit = 10, educator_id = 0 } = query;
      const skip = (page - 1) * limit;

      let whereClause = {};

      if (educator_id) {
        whereClause = { educator_id };
      }

      const students = await this.studentRepository.find({
        where: whereClause,
        relations: ['person_id'],
        skip,
        take: limit,
      });
      return students;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }

  async findBy(
    field: keyof StudentI,
    value: string | number,
  ): Promise<StudentI> {
    try {
      const student = await this.studentRepository.findOne({
        where: { [field]: value },
        relations: ['person_id'],
      });
      return student;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }
}
