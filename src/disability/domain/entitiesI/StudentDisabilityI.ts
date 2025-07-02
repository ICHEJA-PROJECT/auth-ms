import { StudentI } from 'src/auth/domain/entitiesI';
import { DisabilityI } from './DisabilityI';

export interface StudentDisabilityI {
  id_disability: DisabilityI;
  id_student: StudentI;
}
