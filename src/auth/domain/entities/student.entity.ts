import { Person } from './person.entity';

export class Student {
  id: number;
  educator_id: number;
  qr_path: string;
  person_id: Person;

  private constructor(person: Person, educator_id: number) {
    this.person_id = person;
    this.educator_id = educator_id;
  }

  public static create(person: Person, educator_id: number): Student {
    return new Student(person, educator_id);
  }
}
