import { Module } from '@nestjs/common';

import { BankAccountsModule } from '@modules/bank-accounts/bank-accounts.module';
import { CategoriesModule } from '@modules/categories/categories.module';

import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [BankAccountsModule, CategoriesModule],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
