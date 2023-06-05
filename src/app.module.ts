import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { PhonesModule } from './phones/phones.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [UsersModule, PrismaModule, PhonesModule, AddressModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
