import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';

import { PrismaService } from '../prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) {}

  create(args: Prisma.UserCreateArgs) {
    return this.prismaService.user.create(args);
  }

  findUnique(args: Prisma.UserFindUniqueArgs) {
    return this.prismaService.user.findUnique(args);
  }
}
