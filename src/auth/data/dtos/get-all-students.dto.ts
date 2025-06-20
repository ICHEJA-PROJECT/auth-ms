import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class GetAllStudentsQueryDto {
  @ApiProperty({
    description: 'The page number',
    required: false,
  })
  @IsOptional()
  page?: number;

  @ApiProperty({
    description: 'The page size',
    required: false,
  })
  @IsOptional()
  limit?: number;

  @ApiProperty({
    description: 'The educator id',
    required: false,
  })
  @IsOptional()
  educator_id?: number;
}
