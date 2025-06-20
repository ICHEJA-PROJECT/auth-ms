import { PersonRepositoryI } from 'src/auth/domain/repositories/Person.repository';
import { Repository } from 'typeorm';
import { PersonEntity } from '../entities/Person.entity';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonI } from 'src/auth/domain/entitiesI';

@Injectable()
export class PersonRepositoryImp implements PersonRepositoryI {
  constructor(
    @InjectRepository(PersonEntity)
    private readonly personRepository: Repository<PersonEntity>,
  ) {}

  async findAll(): Promise<PersonI[]> {
    try {
      const persons = await this.personRepository.find();
      return persons;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findBy(field: keyof PersonI, value: string | number): Promise<PersonI> {
    try {
      const person = await this.personRepository.findOne({
        where: { [field]: value },
      });
      return person;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
