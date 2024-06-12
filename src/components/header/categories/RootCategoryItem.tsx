'use client';
import React, { MouseEvent } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaCircle } from 'react-icons/fa';
import MenuBox from '@/components/menu/MenuBox';
import InputModal from '@/components/modal/CategoryInputModal';
import Alert from '@/components/Alert';
import useCategory from '@/hooks/category/useCategory';
import { useMenuModalState } from '@/hooks/modal/useModalState';

type Props = {
  categoryId: number;
  color: string;
  name: string;
  dividerId: number | null;
  forUIOnly?: boolean;
};

export default function RootCategoryItem({
  categoryId,
  color,
  name,
  dividerId,
  forUIOnly,
}: Props) {
  const {
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
  } = useMenuModalState(categoryId.toString());

  const { deleteCategoryItemQuery } = useCategory();

  const handleMenuBtn = (e: MouseEvent) => {
    e.stopPropagation();
    if (menuOn) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const handleDelete = (e: MouseEvent) => {
    e.stopPropagation();
    deleteCategoryItemQuery(categoryId);
    closeMenu();
    closeDelete();
  };

  const menus = [
    {
      title: '수정하기',
      handleClick: (e: MouseEvent) => {
        e.stopPropagation();
        setIsEdit({ id: categoryId, name, color });
        openModal(true);
      },
    },
    {
      title: '삭제하기',
      warning: true,
      handleClick: (e: MouseEvent) => {
        e.stopPropagation();
        openDelete();
      },
    },
  ];

  return (
    <>
      <div
        className="w-full flex items-center justify-between relative"
        onClick={(e) => e.preventDefault()}
      >
        <div className="flex items-center gap-2">
          <FaCircle size={20} color={color} />
          <p className="text-On-Surface-Primary text-Body-1">{name}</p>
        </div>
        {!forUIOnly && (
          <button
            type="button"
            aria-label="edit-button"
            className="outline-none p-2"
            onClick={handleMenuBtn}
          >
            <BsThreeDotsVertical color="#9E9E9E" />
          </button>
        )}
        {menuOn && <MenuBox menus={menus} position="right-0 top-6" />}
      </div>
      {deleteOn && (
        <Alert
          isOpen={deleteOn}
          title="카테고리를 삭제하시겠습니까?"
          informativeText={name}
          secondaryBtn="취소"
          secondaryAction={() => {
            closeDelete();
            closeMenu();
          }}
          primaryBtn="삭제하기"
          primaryAction={handleDelete}
        />
      )}
      {modalOn && (
        <InputModal
          isCategory={true}
          modalOn={modalOn}
          closeModal={closeModal}
          isEdit={isEdit}
          closeMenu={closeMenu}
          dividerId={dividerId}
        />
      )}
    </>
  );
}
