import { ApiProperty } from '@nestjs/swagger';
import { Phones } from '@prisma/client';

export class PhoneEntity {
  @ApiProperty()
  typeOfPhone: Phones;

  @ApiProperty()
  number: number;

  @ApiProperty()
  userId: number;
}
