'use client';
import React, { DragEvent, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import cls from 'classnames';
import Image from 'next/image';
import DividerItem from './DividerItem';
import RootCategoryItem from './RootCategoryItem';
import plusBtn from '../../../images/plus-btn.png';
import MenuBox from '@/components/menu/MenuBox';
import InputModal from '@/components/modal/CategoryInputModal';
import { openedDividerState, sideNavState } from '@/atoms/sideNavState';
import { CategoryDividerItem } from '@/types/category';
import useCategory from '@/hooks/category/useCategory';
import { useMenuModalState } from '@/hooks/modal/useModalState';

export default function Categories() {
  const [_, setSideNavOn] = useRecoilState(sideNavState);
  const [openCategories, setOpenCategories] =
    useRecoilState(openedDividerState);
  const [targetId, setTargetId] = useState<string | null>(null);
  const [draggedOverId, setDraggedOverId] = useState<{
    id: string;
    parentId: string | null;
  } | null>(null);
  const {
    menuOn,
    closeMenu,
    openMenu,
    modalOn,
    openModal,
    closeModal,
    isCategory,
  } = useMenuModalState('top-level');
  const { categoriesQuery, orderCategoryItemQuery } = useCategory();
  const router = useRouter();

  const menus = [
    {
      title: '디바이더 추가하기',
      handleClick: () => {
        openModal(false);
      },
    },
    {
      title: '주제 추가하기',
      handleClick: () => {
        openModal(true);
      },
    },
  ];

  const handleDragStart = (e: DragEvent<HTMLElement>) => {
    setTargetId(e.currentTarget.id);
  };

  const handleDragOver = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDraggedOverId({
      id: e.currentTarget.id,
      parentId: e.currentTarget.getAttribute('data-id'),
    });
  };

  const handleDragLeave = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDraggedOverId(null);
  };

  const handleCategoryDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    if (targetId && draggedOverId) {
      orderCategoryItemQuery({
        id: parseInt(targetId),
        dividerId: draggedOverId.parentId
          ? parseInt(draggedOverId.parentId)
          : null,
        prevId: parseInt(draggedOverId.id),
      });
    }
    setDraggedOverId(null);
    setTargetId(null);
  };

  const handleDividerDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    if (targetId && draggedOverId) {
      orderCategoryItemQuery({
        id: parseInt(targetId),
        dividerId: draggedOverId.parentId
          ? parseInt(draggedOverId.parentId)
          : null,
        prevId: parseInt(draggedOverId.id),
      });
    }
    setDraggedOverId(null);
    setTargetId(null);
  };

  const toggleCategory = (id: number) => {
    setOpenCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const renderCategory = (category: CategoryDividerItem, isNested = false) => (
    <li
      key={category.id}
      className={cls(
        'h-14 flex items-center justify-between cursor-pointer',
        isNested
          ? {
              'border-On-Primary-Container border-b-[1px]':
                draggedOverId?.id === category.id + '',
              'border-none': draggedOverId?.id !== category.id + '',
              'bg-Primary-Container-Low border-On-Primary-Container border-[1px]':
                targetId === category.id + '',
              'bg-none border-none': targetId !== category.id + '',
            }
          : {
              'border-On-Primary-Container border-b-[1px]':
                draggedOverId?.id === category.id + '',
              'border-b-[1px] border-Outline-Low':
                draggedOverId?.id !== category.id + '',
              'bg-Primary-Container-Low border-On-Primary-Container border-[1px]':
                targetId === category.id + '',
              'bg-none border-b-[1px] border-Outline-Low':
                targetId !== category.id + '',
            }
      )}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleCategoryDrop}
      onDragLeave={handleDragLeave}
      id={category.id + ''}
      data-id={category.dividerId}
      onClick={() => {
        setSideNavOn(false);
        router.push(`/my/${category.name}/${category.id}`);
      }}
    >
      <RootCategoryItem
        categoryId={category.id}
        name={category.name}
        color={category.color!}
        dividerId={category.dividerId}
      />
    </li>
  );

  const renderDivider = (divider: CategoryDividerItem) => (
    <li
      key={divider.id}
      className={cls(
        'flex flex-col justify-between border-b-[1px] border-Outline-Low',
        {
          'border-On-Primary-Container border-b-[1px]':
            draggedOverId?.id === divider.id + '',
          'border-b-[1px] border-Outline-Low':
            draggedOverId?.id !== divider.id + '',
          'bg-Primary-Container-Low border-On-Primary-Container border-[1px]':
            targetId === divider.id + '',
          'bg-none border-b-[1px] border-Outline-Low':
            targetId !== divider.id + '',
        }
      )}
      draggable
      onDragStart={handleDragStart}
      // onDragOver={handleDragOver}
      // onDrop={handleDividerDrop}
      onDragLeave={handleDragLeave}
      id={divider.id + ''}
      data-id={divider.dividerId}
    >
      <DividerItem
        name={divider.name}
        id={divider.id + ''}
        isDraggedOver={draggedOverId?.id === divider.id + ''}
        toggled={openCategories.has(divider.id)}
        onToggle={() => toggleCategory(divider.id)}
      />
      {openCategories.has(divider.id) && (
        <ul className="pl-6">
          {divider.categories &&
            divider.categories.map((item) => {
              if (item.type === 'CATEGORY') {
                return renderCategory(item, true);
              }
              if (item.type === 'DIVIDER') {
                return renderDivider(item);
              }
            })}
        </ul>
      )}
    </li>
  );

  return (
    <div className="mt-4 text-Body-1">
      <div className="h-14 flex items-center border-b-[1px] border-Outline justify-between relative">
        <button
          type="button"
          aria-label="home-button"
          onClick={() => {
            setSideNavOn(false);
            router.push(`/my`);
          }}
        >
          전체보기
        </button>
        <button
          className="w-9 h-9 flex items-center justify-center"
          aria-label="create-category-btn"
          onClick={() => {
            if (menuOn) {
              closeMenu();
            } else {
              openMenu();
            }
          }}
        >
          <Image
            src={plusBtn}
            width={24}
            height={24}
            alt="add-category-button"
          />
        </button>
        {menuOn && <MenuBox menus={menus} position="right-0" />}
      </div>
      {modalOn && (
        <InputModal
          isCategory={isCategory}
          modalOn={modalOn}
          closeModal={closeModal}
          closeMenu={closeMenu}
          dividerId={null}
        />
      )}
      <ul>
        {categoriesQuery &&
          categoriesQuery.map((item) => {
            if (item.type === 'CATEGORY') {
              return renderCategory(item);
            }
            if (item.type === 'DIVIDER') {
              return renderDivider(item);
            }
          })}
      </ul>
    </div>
  );
}
