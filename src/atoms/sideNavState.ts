import { atom } from 'recoil';

export const sideNavState = atom({ key: 'sideNavState', default: false });

export const sideNavDetailState = atom({
  key: 'sideNavDetailState',
  default: { logout: false, addTopLevel: false },
});

export const openedDividerState = atom({
  key: 'openedDividerState',
  default: new Set(),
});
