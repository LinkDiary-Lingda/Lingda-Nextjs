import React, { DragEvent } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaCircle } from 'react-icons/fa';

type Props = {
  color: string;
  title: string;
};

export default function NestedCategoryItem({ color, title }: Props) {
  return (
    <>
      <div className="flex items-center">
        <FaCircle size={20} color={color} />
        <p>{title}</p>
      </div>
      <button type="button" aria-label="edit-button">
        <BsThreeDotsVertical color="#9E9E9E" />
      </button>
    </>
  );
}
