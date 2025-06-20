import { SexEnum } from '../enums/Sex.enum';

export interface PersonI {
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
}
