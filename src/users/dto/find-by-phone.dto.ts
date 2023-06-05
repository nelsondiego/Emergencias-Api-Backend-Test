import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class FindByPhoneDto {
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  number: number;
}
