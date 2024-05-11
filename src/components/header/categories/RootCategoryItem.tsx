'use client';
import Alert from '@/components/Alert';
import MenuBox from '@/components/menu/MenuBox';
import { deleteCategoryItem } from '@/service/category';
import React, { DragEvent, MouseEvent, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaCircle } from 'react-icons/fa';

type Props = {
  categoryId: number;
  color: string;
  title: string;
  token: string;
};

export default function RootCategoryItem({
  categoryId,
  color,
  title,
  token,
}: Props) {
  const [menuOn, setMenuOn] = useState(false);
  const [deleteOn, setDeleteOn] = useState(false);
  const handleMenuBtn = (e: MouseEvent) => {
    e.stopPropagation();
    setMenuOn(!menuOn);
  };
  const menus = [
    { title: '수정하기', handleClick: () => {} },
    {
      title: '삭제하기',
      warning: true,
      handleClick: (e: MouseEvent) => {
        e.stopPropagation();
        setDeleteOn(true);
      },
    },
  ];
  const handleDelete = async () => {
    await deleteCategoryItem(categoryId, token);
    setDeleteOn(false);
  };
  return (
    <>
      <div className="w-full flex items-center justify-between relative">
        <div className="flex items-center">
          <FaCircle size={20} color={color} />
          <p>{title}</p>
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
          informativeText={title}
          secondaryBtn="취소"
          secondaryAction={() => setDeleteOn(false)}
          primaryBtn="삭제하기"
          primaryAction={handleDelete}
        />
      )}
    </>
  );
}
