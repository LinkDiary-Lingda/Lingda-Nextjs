'use client';
import React, { DragEvent, useState } from 'react';
import DividerItem from './DividerItem';
import RootCategoryItem from './RootCategoryItem';
import NestedCategoryItem from './NestedCategoryItem';

type Category = {
  id: number;
  color: string;
  type: 'category';
  name: string;
  parentId: number;
  prevId: number | null;
};
type Divider = {
  id: number;
  type: 'divider';
  name: string;
  parentId: number;
  prevId: number;
  children: Array<Category | Divider>;
};
export default function Categories() {
  const [draggedOverId, setDraggedOverId] = useState(null);
  const items: Array<Category | Divider> = [
    {
      id: 0,
      type: 'category',
      color: 'red',
      name: '햄스터 키우기',
      parentId: 0,
      prevId: null,
    },
    {
      id: 1,
      type: 'divider',
      name: '디자인 블로그',
      parentId: 0,
      prevId: 0,
      children: [
        {
          id: 5,
          type: 'category',
          color: 'green',
          name: '폰트',
          parentId: 1,
          prevId: null,
        },
        {
          id: 6,
          type: 'category',
          color: 'blue',
          name: '색상',
          parentId: 1,
          prevId: 5,
        },
      ],
    },
    {
      id: 2,
      type: 'category',
      color: 'orange',
      name: '강아지 키우기',
      parentId: 0,
      prevId: 1,
    },
  ];

  const handleDragOver = (e: DragEvent<HTMLElement>) => {
    e.preventDefault(); // 드래그 이벤트의 기본 동작을 방지합니다.
    setDraggedOverId(e.target.getAttribute('data-id'));
  };

  const handleDragLeave = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDraggedOverId(null);
  };

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDraggedOverId(null);
  };

  return (
    <div className="mt-4 w-64 text-Body-1">
      <div
        className="h-14 flex items-center border-b-[1px]"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-id={1}
      >
        전체보기
      </div>
      <ul>
        {items.map((item) => {
          if (item.type === 'category') {
            return (
              <RootCategoryItem
                key={item.id}
                title={item.name}
                color={item.color}
              />
            );
          }
          if (item.type === 'divider') {
            return (
              <li
                key={item.id}
                className="flex flex-col justify-between border-b-[1px] border-Gray-02"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragLeave={handleDragLeave}
              >
                <DividerItem
                  key={item.id}
                  title={item.name}
                  dataId={item.id + ''}
                  isDraggedOver={draggedOverId === item.id + ''}
                />
                <ul>
                  {item.children.map((child) => {
                    if (child.type === 'category') {
                      return (
                        <NestedCategoryItem
                          key={child.id}
                          color={child.color}
                          title={child.name}
                        />
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
