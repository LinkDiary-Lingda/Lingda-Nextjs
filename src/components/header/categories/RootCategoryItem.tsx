import React, { DragEvent } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaCircle } from 'react-icons/fa';

type Props = {
  color: string;
  title: string;
};

export default function RootCategoryItem({ color, title }: Props) {
  return (
    <>
      <div className="flex items-center gap-2">
        <FaCircle size={20} color={color} />
        <p>{title}</p>
      </div>
      <button type="button" aria-label="edit-button">
        <BsThreeDotsVertical color="#9E9E9E" />
      </button>
    </>
  );
}
