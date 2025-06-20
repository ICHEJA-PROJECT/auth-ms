import { StudentI } from 'src/auth/domain/entitiesI';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PersonEntity } from './Person.entity';

@Entity('student')
export class StudentEntity implements StudentI {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  qr_path: string;

  @Column({ type: 'int', nullable: false })
  educator_id: number;

  @OneToOne(() => PersonEntity, { cascade: true, eager: true, nullable: false })
  @JoinColumn({ name: 'person_id', referencedColumnName: 'id' })
  person_id: PersonEntity;
}
