import { ApiProperty } from '@nestjs/swagger';
import { PersonAdapter } from './person.adapter';
import { StudentI } from 'src/auth/domain/entitiesI';

export class StudentAdapter {
  @ApiProperty({
    description: 'The id of the student',
    example: 1,
  })
  id: number;
  @ApiProperty({
    description: 'The educator id of the student',
    example: 1,
  })
  educator_id: number;
  @ApiProperty({
    description: 'The qr path of the student',
    example: 'https://example.com/qr.png',
  })
  qr_path: string;
  @ApiProperty({
    description: 'The person information of the student',
    type: PersonAdapter,
  })
  person_id: PersonAdapter;

  constructor(student: StudentI) {
    this.id = student.id;
    this.educator_id = student.educator_id;
    this.qr_path = student.qr_path;
    this.person_id = new PersonAdapter(student.person_id);
  }
}

export class StudentResponseAdapter {
  @ApiProperty({
    description: 'The students information',
    type: [StudentAdapter],
  })
  students: StudentAdapter[];

  constructor(students: StudentAdapter[]) {
    this.students = students;
  }
}
