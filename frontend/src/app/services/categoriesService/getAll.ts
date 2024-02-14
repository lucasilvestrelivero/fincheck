import { ICategory } from '@app/entities/Category';

import { httpClient } from '../httpClient';

type CategoriesResponse = Array<ICategory>;

export async function getAll() {
  return httpClient.get('categories').json<CategoriesResponse>();
}
