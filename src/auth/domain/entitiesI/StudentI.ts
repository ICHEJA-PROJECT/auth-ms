import { PersonI } from './PersonI';

export interface StudentI {
  id: number;
  educator_id: number;
  qr_path: string;
  person_id: PersonI;
}
