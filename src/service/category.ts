import { CategoryDividerItem, CategoryItem } from '@/types/category';
import { GET, POST } from './HttpClient';

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

export async function getCategoryItems(
  token: string
): Promise<CategoryDividerItem[]> {
  try {
    const categories = await GET({ path: 'categories', token });
    return categories;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
