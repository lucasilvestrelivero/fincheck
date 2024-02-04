import { Injectable, NotFoundException } from '@nestjs/common';

import { BankAccountsService } from '@modules/bank-accounts/bank-accounts.service';
import { ValidateCategoryOwnershipService } from '@modules/categories/services/validate-category-ownership.service';
import { TransactionRepository } from '@shared/database/repositories/transaction.repository';

import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionType } from './entities/transaction.';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionRepo: TransactionRepository,
    private readonly bankAccountService: BankAccountsService,
    private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
  ) {}

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    const { bankAccountId, categoryId, date, name, type, value } = createTransactionDto;
    await this.validateEntitiesOwnership({ userId, categoryId, bankAccountId });

    return this.transactionRepo.create({
      data: { userId, bankAccountId, categoryId, name, type, date, value },
    });
  }

  findByUserId(
    userId: string,
    filters: { year: number; month: number; bankAccountId?: string; type: TransactionType },
  ) {
    return this.transactionRepo.findMany({
      where: {
        userId,
        bankAccountId: filters.bankAccountId,
        type: filters.type,
        date: {
          gte: new Date(Date.UTC(filters.year, filters.month)),
          lt: new Date(Date.UTC(filters.year, filters.month + 1)),
        },
      },
    });
  }

  async update(userId: string, transactionId: string, updateTransactionDto: UpdateTransactionDto) {
    const { bankAccountId, categoryId, date, name, type, value } = updateTransactionDto;
    await this.validateEntitiesOwnership({ userId, categoryId, bankAccountId, transactionId });

    return this.transactionRepo.update({
      data: {
        bankAccountId,
        categoryId,
        date,
        name,
        type,
        value,
      },
      where: { id: transactionId },
    });
  }

  async remove(userId: string, transactionId: string) {
    await this.validateEntitiesOwnership({ userId, transactionId });

    await this.transactionRepo.delete({
      where: { id: transactionId },
    });

    return null;
  }

  private async validateTransactionOwnership(userId: string, transactionId: string) {
    const isOwner = await this.transactionRepo.findFirst({ where: { id: transactionId, userId } });

    if (!isOwner) {
      throw new NotFoundException('Transaction not found.');
    }

    return isOwner;
  }

  private async validateEntitiesOwnership({
    userId,
    bankAccountId,
    categoryId,
    transactionId,
  }: {
    userId: string;
    bankAccountId?: string;
    categoryId?: string;
    transactionId?: string;
  }) {
    await Promise.all([
      transactionId && this.validateTransactionOwnership(userId, transactionId),
      bankAccountId && this.bankAccountService.validateBankAccountOwnership(userId, bankAccountId),
      categoryId && this.validateCategoryOwnershipService.validate(userId, categoryId),
    ]);
  }
}
