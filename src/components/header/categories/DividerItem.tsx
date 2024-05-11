'use client';
import React, { Dispatch, MouseEvent, SetStateAction, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { BsThreeDotsVertical } from 'react-icons/bs';
import cls from 'classnames';
import MenuBox from '@/components/menu/MenuBox';
import Alert from '@/components/Alert';
import InputModal from '@/components/modal/CategoryInputModal';

type Props = {
  name: string;
  id: string;
  isDraggedOver: boolean;
  setItems: Dispatch<SetStateAction<any>>;
};

export default function DividerItem({
  name,
  id,
  isDraggedOver,
  setItems,
}: Props) {
  const [menuOn, setMenuOn] = useState(false);
  const [modalOn, setModalOn] = useState(false);
  const [isCategory, setIsCategory] = useState(true);
  const [isEdit, setIsEdit] = useState<
    { id: number; name: string; color?: string } | undefined
  >({ id: parseInt(id), name });
  const [deleteOn, setDeleteOn] = useState(false);
  const handleMenuBtn = (e: MouseEvent) => {
    e.stopPropagation();
    setMenuOn(!menuOn);
  };

  const menus = [
    {
      title: '수정하기',
      handleClick: () => {
        setModalOn(true);
        setIsCategory(false);
        setIsEdit({ id: parseInt(id), name });
      },
    },
    {
      title: '디바이더 추가하기',
      handleClick: () => {
        setModalOn(true);
        setIsCategory(false);
        setIsEdit(undefined);
      },
    },
    {
      title: '주제 추가하기',
      handleClick: () => {
        setModalOn(true);
        setIsCategory(true);
        setIsEdit(undefined);
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
  const handleDelete = async () => {
    // await deleteCategoryItem(categoryId, token);
    setDeleteOn(false);
  };
  return (
    <>
      <div
        id={id + ''}
        className={cls('h-14 flex items-center justify-between relative', {
          'border-dashed border-b-4': isDraggedOver,
          'border-none border-b-0': !isDraggedOver,
        })}
      >
        <div className="flex items-center gap-2">
          <IoIosArrowDown size={20} color="#9E9E9E" />
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
        {menuOn && <MenuBox menus={menus} position="right-0 top-10" />}
      </div>
      {deleteOn && (
        <Alert
          isOpen={deleteOn}
          title="디바이더를 삭제하시겠습니까?"
          informativeText={name}
          secondaryBtn="취소"
          secondaryAction={() => setDeleteOn(false)}
          primaryBtn="삭제하기"
          primaryAction={handleDelete}
        />
      )}
      {modalOn && (
        <InputModal
          isCategory={isCategory}
          modalOn={modalOn}
          setModalOn={setModalOn}
          setItems={setItems}
          isEdit={isEdit}
        />
      )}
    </>
  );
}
