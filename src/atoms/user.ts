import { atom } from 'recoil';

export const userStatus = atom({
  key: 'userStatus',
  default: { accessToken: null },
});
