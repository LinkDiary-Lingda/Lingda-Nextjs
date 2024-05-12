import {
  CategoryColor,
  CategoryDividerItem,
  CategoryItem,
} from '@/types/category';
import { DELETE, GET, POST, PUT } from '../HttpClient';

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

export async function deleteCategoryItem(id: number, token: string) {
  try {
    const categories = await DELETE({ path: `categories/${id}`, token });
    return categories;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export type EditItem = {
  id: number;
  name: string;
  color?: CategoryColor;
  token: string;
};

export async function editCategoryItem({ id, name, color, token }: EditItem) {
  try {
    const categories = await PUT({
      path: `categories/${id}`,
      token,
      body: { name, color },
    });
    return categories;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
