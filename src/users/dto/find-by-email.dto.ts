import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class FindByEmailDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;
}
