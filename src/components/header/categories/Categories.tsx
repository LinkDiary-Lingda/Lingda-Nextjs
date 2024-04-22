'use client';
import React, { DragEvent, useState } from 'react';
import DividerItem from './DividerItem';
import RootListItem from './RootListItem';
import NestedListItem from './NestedListItem';

export default function Categories() {
  const [draggedOverId, setDraggedOverId] = useState(null);

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
        data-id="1"
      >
        전체보기
      </div>
      <ul>
        <RootListItem title="햄스터 키우기" color="red" />
        <li className="flex flex-col justify-between border-b-[1px] border-Gray-02">
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}
          >
            <DividerItem
              title="디자인 블로그"
              dataId="2"
              isDraggedOver={draggedOverId === '2'}
            />
          </div>
          <ul>
            <NestedListItem color="green" title="색상" />
            <NestedListItem color="gray" title="폰트" />
          </ul>
        </li>
        <RootListItem title="햄스터 키우기" color="orange" />
      </ul>
    </div>
  );
}
