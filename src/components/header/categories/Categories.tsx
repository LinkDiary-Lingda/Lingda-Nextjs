'use client';
import React, { DragEvent, useState } from 'react';
import DividerItem from './DividerItem';
import RootCategoryItem from './RootCategoryItem';
import { GoPlus } from 'react-icons/go';
import MenuBox from '@/components/menu/MenuBox';
import InputModal from '@/components/modal/CategoryInputModal';
import { useRouter } from 'next/navigation';
import useCategory from '@/hooks/category/useCategory';
import cls from 'classnames';
import { CategoryDividerItem } from '@/types/category';
import { useRecoilState } from 'recoil';
import { openedDividerState, sideNavState } from '@/atoms/sideNavState';

export default function Categories() {
  const [sideNavOn, setSideNavOn] = useRecoilState(sideNavState);
  const [openCategories, setOpenCategories] =
    useRecoilState(openedDividerState);

  const router = useRouter();
  const [targetId, setTargetId] = useState<string | null>(null);
  const [draggedOverId, setDraggedOverId] = useState<{
    id: string;
    parentId: string | null;
  } | null>(null);
  const [createMenuOn, setCreateMenuOn] = useState(false);
  const [modalOn, setModalOn] = useState(false);
  const [isCategory, setIsCategory] = useState(true);
  const { categoriesQuery, orderCategoryItemQuery } = useCategory();

  const menus = [
    {
      title: '디바이더 추가하기',
      handleClick: () => {
        setModalOn(true);
        setIsCategory(false);
      },
    },
    {
      title: '주제 추가하기',
      handleClick: () => {
        setModalOn(true);
        setIsCategory(true);
      },
    },
  ];

  const handleDragStart = (e: DragEvent<HTMLElement>) => {
    setTargetId(e.currentTarget.id);
  };

  const handleCategoryDragOver = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDraggedOverId({
      id: e.currentTarget.id,
      parentId: e.currentTarget.getAttribute('data-id'),
    });
  };

  const handleDividerDragOver = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDraggedOverId({
      id: '0',
      parentId: e.currentTarget.id,
    });
  };

  const handleDragLeave = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLElement>) => {
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

  const renderCategory = (category: CategoryDividerItem) => (
    <li
      key={category.id}
      className={cls('h-14 flex items-center justify-between cursor-pointer', {
        'border-Primary-03 border-b-[1px]':
          draggedOverId?.id === category.id + '',
        'border-b-[1px] border-Gray-02': draggedOverId?.id !== category.id + '',
        'bg-Primary-01 border-Primary-03 border-[1px]':
          targetId === category.id + '',
        'bg-none border-b-[1px] border-Gray-02': targetId !== category.id + '',
      })}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleCategoryDragOver}
      onDrop={handleDrop}
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
      className="flex flex-col justify-between border-b-[1px] border-Gray-02"
      draggable
      onDragOver={handleDividerDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
      onDragStart={handleDragStart}
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
                return renderCategory(item);
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
    <div className="mt-4 w-64 text-Body-1">
      <div className="h-14 flex items-center border-b-[1px] justify-between relative">
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
          onClick={() => setCreateMenuOn(!createMenuOn)}
        >
          <GoPlus size={24} />
        </button>
        {createMenuOn && <MenuBox menus={menus} position="right-0" />}
      </div>
      {modalOn && (
        <InputModal
          isCategory={isCategory}
          modalOn={modalOn}
          setModalOn={setModalOn}
          setMenuOn={setCreateMenuOn}
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
