import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PhonesService } from './phones.service';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { PhoneEntity } from './entities/phone.entity';

@ApiTags('Phones')
@Controller('phones')
export class PhonesController {
  constructor(private readonly phonesService: PhonesService) {}

  @Post()
  @ApiCreatedResponse({ type: PhoneEntity })
  create(@Body() createPhoneDto: CreatePhoneDto) {
    return this.phonesService.create(createPhoneDto);
  }

  @Get(':userId')
  findAll(@Param('userId') userId: string) {
    return this.phonesService.findAll(+userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.phonesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhoneDto: UpdatePhoneDto) {
    return this.phonesService.update(+id, updatePhoneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.phonesService.remove(+id);
  }
}
