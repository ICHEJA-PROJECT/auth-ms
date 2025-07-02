import { SexEnum } from '../enums/Sex.enum';

export interface TokenPayloadI {
  id: number;
  name: string;
  father_lastname: string;
  mother_lastname: string;
  curp: string;
  ine_number: string;
  born_date: Date;
  sex: SexEnum;
  disability: string;
}
