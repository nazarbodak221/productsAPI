import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './auth/user/user.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './auth/user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [AuthModule, UserModule, PrismaModule, ProductModule],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
