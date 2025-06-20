import { GetAllStudentsQueryDto } from 'src/auth/data/dtos/get-all-students.dto';
import { Student } from '../entities/student.entity';
import { StudentI } from '../entitiesI';

export interface StudentRepositoryI {
  create(student: Student): Promise<StudentI>;
  findAll(query: GetAllStudentsQueryDto): Promise<StudentI[]>;
  findBy(field: keyof StudentI, value: string | number): Promise<StudentI>;
  updateQrPath(id: number, qrPath: string): Promise<void>;
}
