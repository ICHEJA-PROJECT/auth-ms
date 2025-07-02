import { StudentEntity } from 'src/auth/data/entities';
import { StudentI } from 'src/auth/domain/entitiesI';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DisabilityEntity } from './Disability.entity';
import {
  DisabilityI,
  StudentDisabilityI,
} from 'src/disability/domain/entitiesI';

@Entity('student_disability')
export class StudentDisabilityEntity implements StudentDisabilityI {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @OneToOne(() => DisabilityEntity, {
    cascade: true,
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'id_disability', referencedColumnName: 'id' })
  id_disability: DisabilityI;
  @OneToOne(() => StudentEntity, {
    cascade: true,
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'id_student', referencedColumnName: 'id' })
  id_student: StudentI;
}
