import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from '../auth.module';
import { UserController } from './user.controller';

@Module({
  imports: [AuthModule],
  providers: [UserService, PrismaService],
  controllers: [UserController],
})
export class UserModule {}
