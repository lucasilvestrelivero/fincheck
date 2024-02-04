import { Global, Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';
import { BankAccountRepository } from './repositories/bank-account.repository';
import { CategoryRepository } from './repositories/category.repository';
import { TransactionRepository } from './repositories/transaction.repository';
import { UserRepository } from './repositories/user.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    UserRepository,
    CategoryRepository,
    BankAccountRepository,
    TransactionRepository,
  ],
  exports: [UserRepository, CategoryRepository, BankAccountRepository, TransactionRepository],
})
export class DatabaseModule {}
