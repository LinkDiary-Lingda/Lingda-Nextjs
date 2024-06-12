import { atom } from 'recoil';

export type CategoryProps = { id: null | number; name: string } | null;

export const currentCategoryState = atom<CategoryProps>({
  key: 'currentCategoryState',
  default: null,
});
