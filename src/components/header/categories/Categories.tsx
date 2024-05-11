'use client';
import React, { DragEvent, useState } from 'react';
import DividerItem from './DividerItem';
import RootCategoryItem from './RootCategoryItem';
import NestedCategoryItem from './NestedCategoryItem';
import { Category, Divider } from '@/types/category';
import { GoPlus } from 'react-icons/go';
import MenuBox from '@/components/menu/MenuBox';

export default function Categories() {
  const [draggedOverId, setDraggedOverId] = useState<{
    targetId: string;
    targetParentId: string | null;
  } | null>(null);
  const [items, setItems] = useState<Array<Category | Divider>>([
    {
      id: 0,
      type: 'category',
      color: 'red',
      name: '햄스터 키우기',
      parentId: null,
      prevId: null,
    },
    {
      id: 1,
      type: 'divider',
      name: '디자인 블로그',
      parentId: null,
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
      parentId: null,
      prevId: 1,
    },
  ]);

  const menus = [
    {
      title: '디바이더 추가하기',
      handleClick: () => {},
    },
    {
      title: '주제 추가하기',
      handleClick: () => {},
    },
  ];

  const sortItemsByPrevId = (items: Array<Category | Divider>) => {
    const firstItem = items.find((item) => item.prevId === null);
    const sortedItems = [];
    let currentItem = firstItem;
    let iterations = 0;
    while (currentItem && iterations < items.length) {
      if (currentItem.type === 'divider' && currentItem.children.length > 0) {
        currentItem.children = sortItemsByPrevId(currentItem.children);
      }
      sortedItems.push(currentItem);
      currentItem = items.find((item) => item.prevId === currentItem?.prevId);
      iterations++;
    }
    return sortedItems;
  };
  const handleDragStart = (e: DragEvent<HTMLElement>) => {
    const dragData = {
      itemId: e.currentTarget.id,
      parentId: e.currentTarget.getAttribute('data-id'),
    };
    e.dataTransfer.setData('application/json', JSON.stringify(dragData));
  };

  const handleDragOver = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDraggedOverId({
      targetId: e.currentTarget.id,
      targetParentId: e.currentTarget.getAttribute('data-id'),
    });
  };

  const handleDragLeave = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDraggedOverId(null);
  };

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    if (draggedOverId === null) return;

    const { itemId, parentId } = JSON.parse(
      e.dataTransfer.getData('application/json')
    );

    const updatedItems = items.map((item) => {
      const id = item.id.toString();
      if (id !== itemId) return item;

      const { targetId, targetParentId } = draggedOverId;
      // dragOver한 아이템밑으로 itemId 설정
      if (targetParentId === id && item.type === 'divider') {
        const newChildren = item.children.filter(
          (child) => child.id !== itemId
        );
        return { ...item, children: newChildren };
      }
      return {
        ...item,
        prevId: parseInt(targetId),
        parentId:
          targetParentId !== null ? parseInt(targetParentId) : targetParentId,
      };
    });
    console.log(updatedItems);

    setItems(sortItemsByPrevId(updatedItems));
    setDraggedOverId(null);
  };

  return (
    <div className="mt-4 w-64 text-Body-1">
      <div className="h-14 flex items-center border-b-[1px] justify-between relative">
        <p>전체보기</p>
        <button className="w-9 h-9 flex items-center justify-center">
          <GoPlus size={24} />
        </button>
        <MenuBox menus={menus} position="right-0" />
      </div>
      <ul>
        {items.map((item) => {
          if (item.type === 'category') {
            return (
              <li
                key={item.id}
                className="h-14 flex items-center justify-between border-b-[1px] border-Gray-02"
                draggable
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragLeave={handleDragLeave}
                id={item.id + ''}
                data-id={item.parentId}
              >
                <RootCategoryItem title={item.name} color={item.color} />
              </li>
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
                  title={item.name}
                  id={item.id + ''}
                  isDraggedOver={draggedOverId?.targetId === item.id + ''}
                />
                <ul>
                  {item.children.map((child) => {
                    if (child.type === 'category') {
                      return (
                        <li
                          key={child.id}
                          className="h-14 ml-6 flex items-center justify-between"
                          draggable
                          onDragStart={handleDragStart}
                          onDragOver={handleDragOver}
                          onDrop={handleDrop}
                          onDragLeave={handleDragLeave}
                          id={child.id + ''}
                          data-id={child.parentId}
                        >
                          <NestedCategoryItem
                            color={child.color}
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
