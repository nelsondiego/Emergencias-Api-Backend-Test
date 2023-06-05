import { ApiProperty } from '@nestjs/swagger';

export class Address {
  @ApiProperty()
  location: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  number: number;

  @ApiProperty()
  userId: number;
}
