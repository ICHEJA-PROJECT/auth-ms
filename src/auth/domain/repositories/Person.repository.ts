import { PersonI } from '../entitiesI';

export interface PersonRepositoryI {
  findAll(): Promise<PersonI[]>;
  findBy(field: keyof PersonI, value: string | number): Promise<PersonI>;
}
