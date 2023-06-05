import { ApiProperty } from '@nestjs/swagger';
import { Dni } from '@prisma/client';
import { PhoneEntity } from 'src/phones/entities/phone.entity';

export class UserEntity {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  typeOfDni: Dni;

  @ApiProperty()
  dniNumber: number;

  @ApiProperty()
  age: number;
}
