import { Injectable } from '@nestjs/common';

import { UserRepository } from '@database/repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(private userRepo: UserRepository) {}

  getUserById(userId: string) {
    return this.userRepo.findUnique({ where: { id: userId }, select: { name: true, email: true } });
  }
}
