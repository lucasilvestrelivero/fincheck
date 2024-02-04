import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';

import { PrismaService } from '../prisma.service';

@Injectable()
export class CategoryRepository {
  constructor(private prismaService: PrismaService) {}

  findMany(args: Prisma.CategoryFindManyArgs) {
    return this.prismaService.category.findMany(args);
  }

  findFirst(args: Prisma.CategoryFindFirstArgs) {
    return this.prismaService.category.findFirst(args);
  }
}
