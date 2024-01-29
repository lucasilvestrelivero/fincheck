import { ConflictException, Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';

import { UserRepository } from '@database/repositories/user.repository';

import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private userRepo: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const emailTaken = await this.userRepo.findUnique({
      where: { email: createUserDto.email },
    });

    if (emailTaken) {
      throw new ConflictException('Email is already in use.');
    }

    const hashedPassword = await hash(createUserDto.email, 12);
    const user = await this.userRepo.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
        categories: {
          createMany: {
            data: [
              // Income
              { name: 'Salário', icon: 'salary', type: 'INCOME' },
              { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
              { name: 'Outro', icon: 'other', type: 'INCOME' },
              // Expense
              { name: 'Casa', icon: 'home', type: 'EXPENSE' },
              { name: 'Alimentação', icon: 'food', type: 'EXPENSE' },
              { name: 'Educação', icon: 'education', type: 'EXPENSE' },
              { name: 'Lazer', icon: 'fun', type: 'EXPENSE' },
              { name: 'Mercado', icon: 'grocery', type: 'EXPENSE' },
              { name: 'Roupas', icon: 'clothes', type: 'EXPENSE' },
              { name: 'Transporte', icon: 'transport', type: 'EXPENSE' },
              { name: 'Viagem', icon: 'travel', type: 'EXPENSE' },
              { name: 'Outro', icon: 'other', type: 'EXPENSE' },
            ],
          },
        },
      },
    });

    return {
      name: user.name,
      email: user.email,
    };
  }
}
