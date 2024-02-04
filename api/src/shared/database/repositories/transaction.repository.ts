import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';

import { PrismaService } from '../prisma.service';

@Injectable()
export class TransactionRepository {
  constructor(private prismaService: PrismaService) {}

  create(args: Prisma.TransactionCreateArgs) {
    return this.prismaService.transaction.create(args);
  }

  findMany(args: Prisma.TransactionFindManyArgs) {
    return this.prismaService.transaction.findMany(args);
  }

  findFirst(args: Prisma.TransactionFindFirstArgs) {
    return this.prismaService.transaction.findFirst(args);
  }

  update(args: Prisma.TransactionUpdateArgs) {
    return this.prismaService.transaction.update(args);
  }

  delete(args: Prisma.TransactionDeleteArgs) {
    return this.prismaService.transaction.delete(args);
  }
}
