import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AddressService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAddressDto: CreateAddressDto) {
    try {
      await this.prisma.user.findFirstOrThrow({
        where: { id: createAddressDto.userId },
      });
      return await this.prisma.address.create({ data: createAddressDto });
    } catch {
      throw new NotFoundException(
        `No existe el usuario con el Id: ${createAddressDto.userId}`,
      );
    }
  }

  async findAll(userId: number) {
    try {
      await this.prisma.user.findFirstOrThrow({ where: { id: userId } });
      return await this.prisma.address.findMany({ where: { userId } });
    } catch {
      throw new NotFoundException(`No existe el usuario con el Id: ${userId}`);
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.address.findFirstOrThrow({
        where: { id },
      });
    } catch {
      throw new NotFoundException(`No existe la dirección con el id: ${id}`);
    }
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    try {
      return await this.prisma.address.update({
        where: { id },
        data: updateAddressDto,
      });
    } catch {
      throw new NotFoundException(`No existe la dirección con el id: ${id}`);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.address.delete({ where: { id } });
    } catch {
      throw new NotFoundException(`No existe la dirección con el id: ${id}`);
    }
  }
}
