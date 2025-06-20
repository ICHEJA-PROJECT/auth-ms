import { SexEnum } from '../enums/Sex.enum';

export class Person {
  id: number;
  name: string;
  father_lastname: string;
  mother_lastname: string;
  curp: string;
  ine_number: string;
  born_date: Date;
  sex: SexEnum;
  state: string;
  municipality: string;
  postal_code: string;
  asentamiento: string;
  office_code: string;

  private constructor(
    name: string,
    father_lastname: string,
    mother_lastname: string,
    curp: string,
    ine_number: string,
    born_date: Date,
    sex: SexEnum,
    state: string,
    municipality: string,
    postal_code: string,
    asentamiento: string,
    office_code: string,
  ) {
    this.name = name;
    this.father_lastname = father_lastname;
    this.mother_lastname = mother_lastname;
    this.curp = curp;
    this.ine_number = ine_number;
    this.born_date = born_date;
    this.sex = sex;
    this.state = state;
    this.municipality = municipality;
    this.postal_code = postal_code;
    this.asentamiento = asentamiento;
    this.office_code = office_code;
  }

  public static create(
    name: string,
    father_lastname: string,
    mother_lastname: string,
    curp: string,
    ine_number: string,
    born_date: Date,
    sex: SexEnum,
    state: string,
    municipality: string,
    postal_code: string,
    asentamiento: string,
    office_code: string,
  ): Person {
    return new Person(
      name,
      father_lastname,
      mother_lastname,
      curp,
      ine_number,
      born_date,
      sex,
      state,
      municipality,
      postal_code,
      asentamiento,
      office_code,
    );
  }
}
