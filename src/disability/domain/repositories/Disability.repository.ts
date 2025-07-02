import { CreateStudentDisabilityDto } from 'src/disability/data/dtos/create-student-disability.dto';
import { DisabilityI, StudentDisabilityI } from '../entitiesI';

export interface DisabilityRepositoryI {
  create(request : CreateStudentDisabilityDto): Promise<StudentDisabilityI>;
  getAll(): Promise<DisabilityI[]>;
  getAllWithStudents(): Promise<StudentDisabilityI[]>;
}
