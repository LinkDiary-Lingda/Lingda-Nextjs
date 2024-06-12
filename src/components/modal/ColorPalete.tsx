'use client';
import { CategoryColor } from '@/types/category';
import React, { useState } from 'react';
import cls from 'classnames';
import { FaCircle } from 'react-icons/fa';
type Props = {
  value?: string;
  setValue: any;
};
export default function ColorPalete({ value, setValue }: Props) {
  const [selected, setSelected] = useState<CategoryColor>(value || '#F04242');

  return (
    <div className="flex gap-1 mt-2">
      {[
        '#F04242',
        '#F08A42',
        '#F2CC0D',
        '#47B4EB',
        '#A35CD6',
        '#EC93C7',
        '#E0E0E0',
      ].map((color) => (
        <button
          type="button"
          key={color}
          className={cls(
            `w-6 h-6 m-1 rounded-full cursor-pointer flex justify-center items-center`,
            {
              'bg-black': selected === color,
              'bg-white': selected !== color,
            }
          )}
          id={color}
          onClick={(e) => {
            const color = e.currentTarget.id;
            setSelected(color);
            setValue('color', color);
          }}
        >
          <FaCircle size={18} color={color} />
        </button>
      ))}
    </div>
  );
}
