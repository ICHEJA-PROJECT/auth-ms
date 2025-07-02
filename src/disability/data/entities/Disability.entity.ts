import { DisabilityI } from 'src/disability/domain/entitiesI';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('disability')
export class DisabilityEntity implements DisabilityI {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ type: 'varchar', length: 32, nullable: false, unique: true })
  name: string;
}
