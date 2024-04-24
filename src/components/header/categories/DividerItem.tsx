import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { BsThreeDotsVertical } from 'react-icons/bs';
import cls from 'classnames';

type Props = {
  title: string;
  id: string;
  isDraggedOver: boolean;
};

export default function DividerItem({ title, id, isDraggedOver }: Props) {
  return (
    <div
      id={id}
      className={cls('h-14 flex items-center justify-between ', {
        'border-dashed border-b-4': isDraggedOver,
        'border-none border-b-0': !isDraggedOver,
      })}
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
