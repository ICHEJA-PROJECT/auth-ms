import { ApiProperty } from '@nestjs/swagger';
import { SexEnum } from 'src/auth/domain/enums/Sex.enum';
import { StudentI } from 'src/auth/domain/entitiesI';
import { TokenPayloadI } from 'src/auth/domain/entitiesI/TokenPayloadI';

export class TokenPayloadAdapter implements TokenPayloadI {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  father_lastname: string;

  @ApiProperty()
  mother_lastname: string;

  @ApiProperty()
  curp: string;

  @ApiProperty()
  ine_number: string;

  @ApiProperty()
  born_date: Date;

  @ApiProperty({ enum: SexEnum })
  sex: SexEnum;

  @ApiProperty()
  disability: string;

  static fromStudentToEntity(
    dto: StudentI,
    disability: string = null,
  ): TokenPayloadI {
    const entity = new TokenPayloadAdapter();
    entity.id = dto.id;
    entity.name = dto.person_id.name;
    entity.father_lastname = dto.person_id.father_lastname;
    entity.mother_lastname = dto.person_id.mother_lastname;
    entity.curp = dto.person_id.curp;
    entity.ine_number = dto.person_id.ine_number;
    entity.born_date = new Date(dto.person_id.born_date);
    entity.sex = dto.person_id.sex;
    entity.disability = disability;
    return entity;
  }
}
