import { Injectable, NotFoundException } from '@nestjs/common';

import { BankAccountRepository } from '@shared/database/repositories/bank-account.repository';

import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';

@Injectable()
export class BankAccountsService {
  constructor(private bankAccountRepo: BankAccountRepository) {}

  create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    return this.bankAccountRepo.create({ data: { ...createBankAccountDto, userId } });
  }

  async findByUserId(userId: string) {
    const bankAccounts = await this.bankAccountRepo.findMany({
      where: { userId },
      include: {
        transactions: {
          select: {
            value: true,
            type: true,
          },
        },
      },
    });

    return bankAccounts.map(({ transactions, ...bankAccount }) => {
      const totalTransactions = transactions.reduce(
        (acc, transaction) =>
          acc + (transaction.type === 'INCOME' ? transaction.value : -transaction.value),
        0,
      );
      return {
        ...bankAccount,
        currentBalance: bankAccount.initialBalance + totalTransactions,
      };
    });
  }

  async update(userId: string, bankAccountId: string, updateBankAccountDto: UpdateBankAccountDto) {
    await this.validateBankAccountOwnership(userId, bankAccountId);

    return this.bankAccountRepo.update({
      data: updateBankAccountDto,
      where: { id: bankAccountId },
    });
  }

  async remove(userId: string, bankAccountId: string) {
    await this.validateBankAccountOwnership(userId, bankAccountId);

    await this.bankAccountRepo.delete({
      where: { id: bankAccountId },
    });

    return null;
  }

  async validateBankAccountOwnership(userId: string, bankAccountId: string) {
    const bankAccount = await this.bankAccountRepo.findFirst({
      where: { userId, id: bankAccountId },
    });

    if (!bankAccount) {
      throw new NotFoundException('Bank Account not found');
    }

    return bankAccount;
  }
}
