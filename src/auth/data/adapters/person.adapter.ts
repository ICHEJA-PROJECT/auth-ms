import { ApiProperty } from '@nestjs/swagger';
import { PersonI } from 'src/auth/domain/entitiesI';
import { SexEnum } from 'src/auth/domain/enums/Sex.enum';

export class PersonAdapter {
  @ApiProperty({
    description: 'The id of the person',
    example: 1,
  })
  id: number;
  @ApiProperty({
    description: 'The name of the person',
    example: 'John',
  })
  name: string;
  @ApiProperty({
    description: 'The father lastname of the person',
    example: 'Doe',
  })
  father_lastname: string;
  @ApiProperty({
    description: 'The mother lastname of the person',
    example: 'Doe',
  })
  mother_lastname: string;
  @ApiProperty({
    description: 'The curp of the person',
    example: '1234567890',
  })
  curp: string;
  @ApiProperty({
    description: 'The ine number of the person',
    example: '1234567890',
  })
  ine_number: string;
  @ApiProperty({
    description: 'The born date of the person',
    example: '1990-01-01',
  })
  born_date: Date;
  @ApiProperty({
    description: 'The sex of the person',
    example: 'M',
    type: SexEnum,
    enum: SexEnum,
  })
  sex: SexEnum;
  @ApiProperty({
    description: 'The state of the person',
    example: 'Jalisco',
  })
  state: string;
  @ApiProperty({
    description: 'The municipality of the person',
    example: 'Guadalajara',
  })
  municipality: string;
  @ApiProperty({
    description: 'The postal code of the person',
    example: '44100',
  })
  postal_code: string;
  @ApiProperty({
    description: 'The asentamiento of the person',
    example: 'Asentamiento 1',
  })
  asentamiento: string;
  @ApiProperty({
    description: 'The office code of the person',
    example: '1234567890',
  })
  office_code: string;

  constructor(person: PersonI) {
    this.id = person.id;
    this.name = person.name;
    this.father_lastname = person.father_lastname;
    this.mother_lastname = person.mother_lastname;
    this.curp = person.curp;
    this.ine_number = person.ine_number;
    this.born_date = person.born_date;
    this.sex = person.sex;
    this.state = person.state;
    this.municipality = person.municipality;
    this.postal_code = person.postal_code;
    this.office_code = person.office_code;
    this.asentamiento = person.asentamiento;
  }
}
