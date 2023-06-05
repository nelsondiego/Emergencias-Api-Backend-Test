import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindByAddressDto } from './dto/find-by-address.dto';
import { FindByUserDataDto } from './dto/find-by-user-data.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({ data: createUserDto });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.user
      .findFirstOrThrow({
        where: { id },
        include: { phones: true, addresses: true },
      })
      .catch(() => {
        throw new NotFoundException(`No existe el usuario con el Id: ${id}`);
      });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.prisma.user
      .update({
        where: { id },
        data: updateUserDto,
      })
      .catch(() => {
        throw new NotFoundException(`No existe el usuario con el Id: ${id}`);
      });
  }

  async remove(id: number) {
    try {
      const deletePhones = this.prisma.phone.deleteMany({
        where: { userId: id },
      });

      const deleteAddresses = this.prisma.address.deleteMany({
        where: { userId: id },
      });

      const deleteUser = this.prisma.user.delete({
        where: { id },
      });

      return await this.prisma.$transaction([
        deletePhones,
        deleteAddresses,
        deleteUser,
      ]);
    } catch (e) {
      throw new NotFoundException(e);
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.prisma.user.findFirstOrThrow({ where: { email } });
    } catch {
      throw new NotFoundException(
        `No existe el usuario con el email: ${email}`,
      );
    }
  }

  async findByPhone(numberOfPhone: number) {
    try {
      return await this.prisma.user.findFirstOrThrow({
        where: {
          phones: {
            some: {
              number: {
                equals: numberOfPhone,
              },
            },
          },
        },
      });
    } catch {
      throw new NotFoundException(
        `No existe el usuario con el telefono: ${numberOfPhone}`,
      );
    }
  }

  async findByAddress({ address, number }: FindByAddressDto) {
    try {
      return await this.prisma.user.findFirstOrThrow({
        where: {
          addresses: {
            some: {
              street: {
                equals: address,
              },
              number: {
                equals: number,
              },
            },
          },
        },
      });
    } catch {
      throw new NotFoundException(
        `No existe el usuario con la dirección: ${address} ${number}`,
      );
    }
  }

  async findByUserData({
    firstName,
    lastName,
    dniNumber,
    age,
  }: FindByUserDataDto) {
    try {
      return await this.prisma.user.findMany({
        where: {
          firstName,
          lastName,
          dniNumber,
          age,
        },
      });
    } catch {
      throw new NotFoundException(`No se encontro un usuario con esos datos`);
    }
  }
}
