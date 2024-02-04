import { Injectable, NotFoundException } from '@nestjs/common';

import { CategoryRepository } from '@shared/database/repositories/category.repository';

@Injectable()
export class ValidateCategoryOwnershipService {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async validate(userId: string, categoryId: string) {
    const isOwner = await this.categoryRepo.findFirst({ where: { id: categoryId, userId } });

    if (!isOwner) {
      throw new NotFoundException('Category not found.');
    }

    return isOwner;
  }
}
