'use client';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  modalState,
  currentOpenMenuState,
  editState,
  isCategoryState,
} from '@/atoms/modalState';
import { useEffect } from 'react';

export function useMenuModalState(id: string) {
  const [menuOn, setMenuOn] = useRecoilState(modalState(`menu-${id}`));
  const [modalOn, setModalOn] = useRecoilState(modalState(`modal-${id}`));
  const [deleteOn, setDeleteOn] = useRecoilState(modalState(`delete-${id}`));
  const [isEdit, setIsEdit] = useRecoilState(editState(id));
  const [isCategory, setIsCategory] = useRecoilState(isCategoryState(id));
  const currentOpenMenu = useRecoilValue(currentOpenMenuState);
  const setCurrentOpenMenu = useSetRecoilState(currentOpenMenuState);

  useEffect(() => {
    if (currentOpenMenu && currentOpenMenu !== `menu-${id}`) {
      setMenuOn(false);
    }
  }, [currentOpenMenu, id, setMenuOn]);

  const openMenu = () => {
    setMenuOn(true);
    setCurrentOpenMenu(`menu-${id}`);
  };

  const closeMenu = () => {
    setMenuOn(false);
    setCurrentOpenMenu(null);
  };

  const openModal = (category: boolean) => {
    setIsCategory(category);
    setModalOn(true);
  };

  const closeModal = () => {
    setModalOn(false);
  };

  const openDelete = () => {
    setDeleteOn(true);
  };

  const closeDelete = () => {
    setDeleteOn(false);
  };

  return {
    menuOn,
    openMenu,
    closeMenu,
    modalOn,
    openModal,
    closeModal,
    deleteOn,
    openDelete,
    closeDelete,
    isEdit,
    setIsEdit,
    isCategory,
  };
}
