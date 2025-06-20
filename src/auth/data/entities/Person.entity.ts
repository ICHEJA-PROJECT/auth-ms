import { PersonI } from 'src/auth/domain/entitiesI';
import { SexEnum } from 'src/auth/domain/enums/Sex.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('person')
export class PersonEntity implements PersonI {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  father_lastname: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  mother_lastname: string;

  @Column({ type: 'varchar', length: 18, nullable: false })
  curp: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  ine_number: string;

  @Column({ type: 'date', nullable: false })
  born_date: Date;

  @Column({ type: 'enum', enum: SexEnum, nullable: false })
  sex: SexEnum;

  @Column({ type: 'varchar', length: 255, nullable: false })
  state: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  municipality: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  postal_code: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  asentamiento: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  office_code: string;
}
