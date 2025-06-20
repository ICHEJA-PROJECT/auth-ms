import { CreateStudentDto } from '../dtos/create-student.dto';
import { Person } from '../../domain/entities/person.entity';
import { Student } from '../../domain/entities/student.entity';

export class StudentMapper {
  static toEntity(dto: CreateStudentDto): Student {
    const person = Person.create(
      dto.name,
      dto.father_lastname,
      dto.mother_lastname,
      dto.curp,
      dto.ine_number,
      new Date(dto.born_date),
      dto.sex,
      dto.state,
      dto.municipality,
      dto.postal_code,
      dto.asentamiento,
      dto.office_code,
    );

    return Student.create(person, dto.educator_id);
  }
}
