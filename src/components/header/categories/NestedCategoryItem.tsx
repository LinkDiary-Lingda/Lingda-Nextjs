import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaCircle } from 'react-icons/fa';

type Props = {
  color: string;
  title: string;
};

export default function NestedCategoryItem({ color, title }: Props) {
  return (
    <li className="h-14 ml-6 flex items-center justify-between" draggable>
      <div className="flex items-center gap-2">
        <FaCircle size={20} color={color} />
        <p>{title}</p>
      </div>
      <button type="button" aria-label="edit-button">
        <BsThreeDotsVertical color="#9E9E9E" />
      </button>
    </li>
  );
}
