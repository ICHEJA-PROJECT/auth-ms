import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { SexEnum } from 'src/auth/domain/enums/Sex.enum';

export class CreateStudentDto {
  @ApiProperty({ description: 'The name of the student', example: 'John' })
  @IsString()
  name: string;
  @ApiProperty({
    description: 'The father lastname of the student',
    example: 'Doe',
  })
  @IsString()
  father_lastname: string;
  @ApiProperty({
    description: 'The mother lastname of the student',
    example: 'Doe',
  })
  @IsString()
  mother_lastname: string;
  @ApiProperty({
    description: 'The CURP of the student',
    example: 'FORF040807HCSLVRA8',
  })
  @IsString()
  @Length(18, 18, {
    message: 'The CURP must be 18 characters long',
  })
  curp: string;
  @ApiProperty({
    description: 'The INE number of the student',
    example: 'FLRVFR04080707H400',
  })
  @IsString()
  @MaxLength(20, {
    message: 'The INE number must be less than 20 characters long',
  })
  ine_number: string;
  @ApiProperty({
    description: 'The birth date of the student',
    example: '1999-12-31',
  })
  @IsString()
  @IsDateString()
  born_date: string;
  @ApiProperty({ enum: SexEnum, example: 'F' })
  @IsEnum(SexEnum, {
    message: 'The values for the sex must be F or M',
  })
  sex: SexEnum;
  @ApiProperty({ description: 'The state of the student', example: 'Jalisco' })
  @IsString()
  state: string;
  @ApiProperty({
    description: 'The municipality of the student',
    example: 'Guadalajara',
  })
  @IsString()
  municipality: string;
  @ApiProperty({
    description: 'The postal code of the student',
    example: '44100',
  })
  @IsString()
  postal_code: string;
  @ApiProperty({
    description: 'The asentamiento of the student',
    example: 'Asentamiento 1',
  })
  @IsString()
  asentamiento: string;
  @ApiProperty({
    description: 'The office code of the student',
    example: '1234567890',
  })
  @IsString()
  office_code: string;
  @ApiProperty({ description: 'The educator id of the student', example: 1 })
  @IsNumber()
  educator_id: number;
}
