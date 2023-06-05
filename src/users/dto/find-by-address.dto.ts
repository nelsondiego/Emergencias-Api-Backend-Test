import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class FindByAddressDto {
  @IsNotEmpty()
  @ApiProperty()
  address: string;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  number: number;
}
