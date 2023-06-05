import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { FindByEmailDto } from './dto/find-by-email.dto';
import { FindByPhoneDto } from './dto/find-by-phone.dto';
import { FindByAddressDto } from './dto/find-by-address.dto';
import { FindByUserDataDto } from './dto/find-by-user-data.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post('find-by-email')
  findByEmail(@Body() findByEmailDto: FindByEmailDto) {
    return this.usersService.findByEmail(findByEmailDto.email);
  }

  @Post('find-by-phone')
  findByPhone(@Body() findByPhoneDto: FindByPhoneDto) {
    return this.usersService.findByPhone(findByPhoneDto.number);
  }

  @Post('find-by-address')
  findByAddress(@Body() findByAddressDto: FindByAddressDto) {
    return this.usersService.findByAddress(findByAddressDto);
  }

  @Post('find-by-user-data')
  findByUserData(@Body() findByUserDataDto: FindByUserDataDto) {
    return this.usersService.findByUserData(findByUserDataDto);
  }
}
