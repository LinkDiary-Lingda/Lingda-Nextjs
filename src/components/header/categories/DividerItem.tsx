import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { BsThreeDotsVertical } from 'react-icons/bs';
import cls from 'classnames';

type Props = {
  title: string;
  dataId: string;
  isDraggedOver: boolean;
};

export default function DividerItem({ title, dataId, isDraggedOver }: Props) {
  return (
    <div
      className={cls('h-14 flex items-center justify-between ', {
        'border-dashed border-b-4': isDraggedOver,
        'border-none border-b-0': !isDraggedOver,
      })}
      data-id={dataId}
    >
      <div className="flex items-center gap-2">
        <IoIosArrowDown size={20} color="#9E9E9E" />
        <p>{title}</p>
      </div>
      <button type="button" aria-label="edit-button">
        <BsThreeDotsVertical color="#9E9E9E" />
      </button>
    </div>
  );
}
