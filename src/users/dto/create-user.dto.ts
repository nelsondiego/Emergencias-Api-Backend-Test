import { ApiProperty } from '@nestjs/swagger';
import { Dni } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsEnum(Dni)
  @ApiProperty()
  typeOfDni: Dni = 'DNI';

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  dniNumber: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  age: number;
}
