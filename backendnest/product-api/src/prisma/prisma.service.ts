import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: ['query'],
    });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('DB connection installed');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('DB connect closed.');
  }
}
