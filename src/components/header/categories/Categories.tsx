'use client';
import React, { Dispatch, DragEvent, SetStateAction, useState } from 'react';
import DividerItem from './DividerItem';
import RootCategoryItem from './RootCategoryItem';
import NestedCategoryItem from './NestedCategoryItem';
import { GoPlus } from 'react-icons/go';
import MenuBox from '@/components/menu/MenuBox';
import InputModal from '@/components/modal/CategoryInputModal';
import { useRouter } from 'next/navigation';
import useCategory from '@/hooks/category/useCategory';
import cls from 'classnames';
import Link from 'next/link';

type Props = {
  setMenuOn: Dispatch<SetStateAction<boolean>>;
};

export default function Categories({ setMenuOn }: Props) {
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

  return (
    <div className="mt-4 w-64 text-Body-1">
      <div className="h-14 flex items-center border-b-[1px] justify-between relative">
        <button
          type="button"
          aria-label="home-button"
          onClick={() => {
            setMenuOn(false);
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
              return (
                <li
                  key={item.id}
                  className={cls(
                    'h-14 flex items-center justify-between cursor-pointer',
                    {
                      'border-Primary-03 border-b-[1px]':
                        draggedOverId?.id === item.id + '',
                      'border-b-[1px] border-Gray-02':
                        draggedOverId?.id !== item.id + '',
                      'bg-Primary-01 border-Primary-03 border-[1px]':
                        targetId === item.id + '',
                      'bg-none border-b-[1px] border-Gray-02':
                        targetId !== item.id + '',
                    }
                  )}
                  draggable
                  onDragStart={handleDragStart}
                  onDragOver={handleCategoryDragOver}
                  onDrop={handleDrop}
                  onDragLeave={handleDragLeave}
                  id={item.id + ''}
                  data-id={item.dividerId}
                  onClick={() => {
                    setMenuOn(false);
                    router.push(`/my/${item.name}/${item.id}`);
                  }}
                >
                  <RootCategoryItem
                    categoryId={item.id}
                    name={item.name}
                    color={item.color!}
                    dividerId={item.dividerId}
                  />
                </li>
              );
            }
            if (item.type === 'DIVIDER') {
              return (
                <li
                  key={item.id}
                  className="flex flex-col justify-between border-b-[1px] border-Gray-02"
                  draggable
                  onDragOver={handleDividerDragOver}
                  onDrop={handleDrop}
                  onDragLeave={handleDragLeave}
                  onDragStart={handleDragStart}
                  id={item.id + ''}
                  data-id={item.dividerId}
                >
                  <DividerItem
                    name={item.name}
                    id={item.id + ''}
                    isDraggedOver={draggedOverId?.id === item.id + ''}
                  />
                  <ul>
                    {item.categories.map((child) => {
                      if (child.type === 'CATEGORY') {
                        return (
                          <li
                            key={child.id}
                            className="h-14 ml-6 flex items-center justify-between"
                            draggable
                            onDragStart={handleDragStart}
                            onDragOver={handleCategoryDragOver}
                            onDrop={handleDrop}
                            onDragLeave={handleDragLeave}
                            id={child.id + ''}
                            data-id={child.dividerId}
                          >
                            <NestedCategoryItem
                              color={child.color!}
                              title={child.name}
                            />
                          </li>
                        );
                      }
                    })}
                  </ul>
                </li>
              );
            }
          })}
      </ul>
    </div>
  );
}
