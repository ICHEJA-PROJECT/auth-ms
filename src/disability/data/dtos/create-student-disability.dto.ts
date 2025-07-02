import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateStudentDisabilityDto {
  @ApiProperty({
    description: 'The name of the disability',
    example: 'Sordomudo',
  })
  @IsString()
  disability_name: string;
  @ApiProperty({
    description: 'The id of the student',
    example: 1,
  })
  @IsNumber()
  student_id: number;
}
