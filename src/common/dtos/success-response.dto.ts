import { ApiProperty } from '@nestjs/swagger';
import { Type } from '@nestjs/common';

export function createSuccessResponseDto<T>(dataType: Type<T>) {
  class SuccessResponseDto {
    @ApiProperty({ example: true })
    success: boolean;

    @ApiProperty({ type: dataType })
    data: T;

    @ApiProperty({ example: 'Request successful' })
    message: string;
  }
  return SuccessResponseDto;
}
