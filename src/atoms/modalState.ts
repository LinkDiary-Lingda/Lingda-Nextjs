import { atom, atomFamily } from 'recoil';

export const modalState = atomFamily({
  key: 'modalState',
  default: false,
});

export const currentOpenMenuState = atom<string | null>({
  key: 'currentOpenMenuState',
  default: null,
});

type EditStateType = {
  id: number;
  name: string;
  color: string;
} | null;

export const editState = atomFamily<EditStateType, string>({
  key: 'editState',
  default: null,
});

export const isCategoryState = atomFamily({
  key: 'isCategoryState',
  default: true,
});
