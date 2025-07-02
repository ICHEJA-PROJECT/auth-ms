import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DisabilityI,
  StudentDisabilityI,
} from 'src/disability/domain/entitiesI';
import { DisabilityRepositoryI } from 'src/disability/domain/repositories/Disability.repository';
import { Repository } from 'typeorm';
import { StudentDisabilityEntity } from '../entities/StudentDisability.entity';
import { CreateStudentDisabilityDto } from '../dtos/create-student-disability.dto';

@Injectable()
export class DisabilityRepositoryImp implements DisabilityRepositoryI {
  constructor(
    @InjectRepository(StudentDisabilityEntity)
    private readonly _disabilityRepository: Repository<StudentDisabilityEntity>,
  ) {}

  async create(
    request: CreateStudentDisabilityDto,
  ): Promise<StudentDisabilityI> {
    try {
      const req = await this._disabilityRepository.create({
        id_disability: {
          name: request.disability_name,
        },
        id_student: {
          id: request.student_id,
        },
      });
      const res = await this._disabilityRepository.save(req);
      return res;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAll(): Promise<DisabilityI[]> {
    try {
      const res = await this._disabilityRepository.find({
        select: ['id_disability'],
      });
      return res.map((i) => i.id_disability);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAllWithStudents(): Promise<StudentDisabilityI[]> {
    try {
      return await this._disabilityRepository.find({
        select: ['id_student', 'id_disability'],
      });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
