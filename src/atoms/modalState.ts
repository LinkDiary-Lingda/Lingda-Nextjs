import { atom, atomFamily } from 'recoil';

export const modalState = atomFamily({
  key: 'modalState',
  default: false,
});

export const currentOpenMenuState = atom<string | null>({
  key: 'currentOpenMenuState',
  default: null,
});

export const editState = atomFamily({
  key: 'editState',
  default: {
    id: 0,
    name: '',
    color: '',
  },
});

export const isCategoryState = atomFamily({
  key: 'isCategoryState',
  default: true,
});
