import { ApiProperty } from '@nestjs/swagger';

export class FindByUserDataDto {
  @ApiProperty({ required: false })
  firstName?: string;

  @ApiProperty({ required: false })
  lastName?: string;

  @ApiProperty({ required: false })
  dniNumber?: number;

  @ApiProperty({ required: false })
  age?: number;
}
