import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PhonesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPhoneDto: CreatePhoneDto) {
    const { userId } = createPhoneDto;
    try {
      await this.prisma.user.findUniqueOrThrow({ where: { id: userId } });
      return await this.prisma.phone.create({ data: createPhoneDto });
    } catch {
      throw new NotFoundException(`No existe el usuario con el Id: ${userId}`);
    }
  }

  async findAll(userId: number) {
    try {
      await this.prisma.user.findUniqueOrThrow({
        where: { id: userId },
      });
      return await this.prisma.phone.findMany({ where: { userId } });
    } catch {
      throw new NotFoundException(`No existe el usuario con el Id: ${userId}`);
    }
  }

  async findOne(id: number) {
    return await this.prisma.phone
      .findFirstOrThrow({
        where: { id },
        include: { User: true },
      })
      .catch(() => {
        throw new NotFoundException(`No existe el telefono con el id: ${id}`);
      });
  }

  async update(id: number, updatePhoneDto: UpdatePhoneDto) {
    return await this.prisma.phone
      .update({
        where: { id },
        data: updatePhoneDto,
      })
      .catch(() => {
        throw new NotFoundException(`No existe el telefono con el id: ${id}`);
      });
  }

  async remove(id: number) {
    return await this.prisma.phone.delete({ where: { id } }).catch(() => {
      throw new NotFoundException(`No existe el telefono con el id: ${id}`);
    });
  }
}
