'use client';
import React, { MouseEvent, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import cls from 'classnames';
import MenuBox from '@/components/menu/MenuBox';
import Alert from '@/components/Alert';
import InputModal from '@/components/modal/CategoryInputModal';
import useCategory from '@/hooks/category/useCategory';
import arrowRight from '../../../images/arrow-right.png';
import arrowDown from '../../../images/arrow-down.png';
import Image from 'next/image';

type Props = {
  name: string;
  id: string;
  isDraggedOver: boolean;
  toggled: boolean;
  onToggle: () => void;
};

export default function DividerItem({
  name,
  id,
  isDraggedOver,
  toggled,
  onToggle,
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

  const { deleteCategoryItemQuery } = useCategory();

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
      handleClick: () => {
        setDeleteOn(true);
        setMenuOn(false);
      },
    },
  ];
  const handleDelete = async () => {
    await deleteCategoryItemQuery(parseInt(id));
    setDeleteOn(false);
  };

  return (
    <>
      <div
        id={id}
        className={cls('h-14 flex items-center justify-between relative', {
          'border-Primary-03 border-b-[1px]': isDraggedOver,
          'border-none border-b-0': !isDraggedOver,
        })}
        onClick={onToggle}
      >
        <div className="flex items-center gap-1">
          {toggled ? (
            <Image
              src={arrowDown}
              width={20}
              height={20}
              alt="opened-category-arrow-img"
            />
          ) : (
            <Image
              src={arrowRight}
              width={20}
              height={20}
              alt="closed-category-arrow-img"
            />
          )}
          <p className="text-On-Surface-Primary text-Body-1">{name}</p>
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
          isCategory={isCategory}
          modalOn={modalOn}
          setModalOn={setModalOn}
          isEdit={isEdit}
          setMenuOn={setMenuOn}
          dividerId={id ? parseInt(id) : null}
        />
      )}
    </>
  );
}
