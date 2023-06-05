import { ApiProperty } from '@nestjs/swagger';
import { Phones } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsPositive } from 'class-validator';

export class CreatePhoneDto {
  @IsNotEmpty()
  @IsEnum(Phones)
  @ApiProperty()
  typeOfPhone: Phones;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  number: number;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  userId: number;
}
