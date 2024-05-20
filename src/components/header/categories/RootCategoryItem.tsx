'use client';
import Alert from '@/components/Alert';
import MenuBox from '@/components/menu/MenuBox';
import InputModal from '@/components/modal/CategoryInputModal';
import useCategory from '@/hooks/category/useCategory';
import React, { MouseEvent, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaCircle } from 'react-icons/fa';

type Props = {
  categoryId: number;
  color: string;
  name: string;
  dividerId: number | null;
};

export default function RootCategoryItem({
  categoryId,
  color,
  name,
  dividerId,
}: Props) {
  const [menuOn, setMenuOn] = useState(false);
  const [isEdit, setIsEdit] = useState<
    { id: number; name: string; color?: string } | undefined
  >({ id: categoryId, name });
  const [modalOn, setModalOn] = useState(false);
  const [deleteOn, setDeleteOn] = useState(false);
  const handleMenuBtn = (e: MouseEvent) => {
    e.stopPropagation();
    setMenuOn(!menuOn);
  };
  const menus = [
    {
      title: '수정하기',
      handleClick: (e: MouseEvent) => {
        e.stopPropagation();
        setModalOn(true);
        setIsEdit({ id: categoryId, name });
      },
    },
    {
      title: '삭제하기',
      warning: true,
      handleClick: (e: MouseEvent) => {
        e.stopPropagation();
        setDeleteOn(true);
      },
    },
  ];

  const { deleteCategoryItemQuery } = useCategory();
  const handleDelete = (e: MouseEvent) => {
    e.stopPropagation();
    deleteCategoryItemQuery(categoryId);
    setMenuOn(false);
    setDeleteOn(false);
  };
  return (
    <>
      <div
        className="w-full flex items-center justify-between relative"
        onClick={(e) => e.preventDefault()}
      >
        <div className="flex items-center gap-2">
          <FaCircle size={20} color={color} />
          <p>{name}</p>
        </div>
        <button
          type="button"
          aria-label="edit-button"
          className="outline-none p-2"
          onClick={handleMenuBtn}
        >
          <BsThreeDotsVertical color="#9E9E9E" />
        </button>
        {menuOn && <MenuBox menus={menus} position="right-0 top-6" />}
      </div>
      {deleteOn && (
        <Alert
          isOpen={deleteOn}
          title="카테고리를 삭제하시겠습니까?"
          informativeText={name}
          secondaryBtn="취소"
          secondaryAction={() => {
            setDeleteOn(false);
            setMenuOn(false);
          }}
          primaryBtn="삭제하기"
          primaryAction={handleDelete}
        />
      )}
      {modalOn && (
        <InputModal
          isCategory={true}
          modalOn={modalOn}
          setModalOn={setModalOn}
          isEdit={isEdit}
          setMenuOn={setMenuOn}
          dividerId={dividerId}
        />
      )}
    </>
  );
}
