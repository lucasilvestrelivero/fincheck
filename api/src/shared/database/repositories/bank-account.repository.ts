import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';

import { PrismaService } from '../prisma.service';

@Injectable()
export class BankAccountRepository {
  constructor(private prismaService: PrismaService) {}

  create(args: Prisma.BankAccountCreateArgs) {
    return this.prismaService.bankAccount.create(args);
  }

  findMany<T extends Prisma.BankAccountFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.BankAccountFindManyArgs>,
  ) {
    return this.prismaService.bankAccount.findMany(args);
  }

  findFirst(args: Prisma.BankAccountFindFirstArgs) {
    return this.prismaService.bankAccount.findFirst(args);
  }

  update(args: Prisma.BankAccountUpdateArgs) {
    return this.prismaService.bankAccount.update(args);
  }

  delete(args: Prisma.BankAccountDeleteArgs) {
    return this.prismaService.bankAccount.delete(args);
  }
}
