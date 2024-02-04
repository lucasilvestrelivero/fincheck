import { Injectable } from '@nestjs/common';

import { CategoryRepository } from '@shared/database/repositories/category.repository';

@Injectable()
export class CategoriesService {
  constructor(private categoryRepo: CategoryRepository) {}
  // create(createCategoryDto: CreateCategoryDto) {
  //   return 'This action adds a new category';
  // }

  findByUserId(userId: string) {
    return this.categoryRepo.findMany({ where: { userId } });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} category`;
  // }

  // update(id: number, updateCategoryDto: UpdateCategoryDto) {
  //   return `This action updates a #${id} category`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} category`;
  // }
}
