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
import { DisabilityEntity } from '../entities';

@Injectable()
export class DisabilityRepositoryImp implements DisabilityRepositoryI {
  constructor(
    @InjectRepository(StudentDisabilityEntity)
    private readonly _studentDisabilityRepository: Repository<StudentDisabilityEntity>,
    @InjectRepository(DisabilityEntity)
    private readonly _disabilityEntityRepository: Repository<DisabilityEntity>,
  ) {}

  async create(
    request: CreateStudentDisabilityDto,
  ): Promise<StudentDisabilityI> {
    try {
      let disability = await this._disabilityEntityRepository.findOne({
        where: {
          name: request.disability_name,
        },
      });
      if (!disability) {
        disability = await this._disabilityEntityRepository.create({
          name: request.disability_name,
        });
        disability = await this._disabilityEntityRepository.save(disability);
      }
      const req = await this._studentDisabilityRepository.create({
        id_disability: disability,
        id_student: {
          id: request.student_id,
        },
      });
      const res = await this._studentDisabilityRepository.save(req);
      return res;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAll(): Promise<DisabilityI[]> {
    try {
      const res = await this._disabilityEntityRepository.find({
        relations: ['id_student'],
      });
      return res;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAllWithStudents(): Promise<StudentDisabilityI[]> {
    try {
      return await this._studentDisabilityRepository.find({
        relations: ['id_student', 'id_disability'],
      });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
