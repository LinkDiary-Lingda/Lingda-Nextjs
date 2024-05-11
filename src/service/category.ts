import { CategoryItem } from '@/types/category';
import { POST } from './HttpClient';

export async function createCategoryItem(
  category: CategoryItem,
  token: string
) {
  try {
    const created = await POST({ path: 'categories', body: category, token });
    return created;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
