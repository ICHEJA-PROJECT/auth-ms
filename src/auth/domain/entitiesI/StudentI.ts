import { StudentDisabilityI } from 'src/disability/domain/entitiesI';
import { PersonI } from './PersonI';

export interface StudentI {
  id: number;
  educator_id: number;
  qr_path: string;
  person_id: PersonI;
  // disability_id: StudentDisabilityI; // Eliminado por nueva relación ManyToOne
}
