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
    <div className="flex gap-1 h-8">
      {[
        '#F04242',
        '#F08A42',
        '#F2CC0D',
        '#47B4EB',
        '#A35CD6',
        '#EC93C7',
        '#E0E0E0',
      ].map((color) => (
        <li key={color} className="w-8 h-8 flex items-center justify-center">
          <button
            type="button"
            className={cls(
              'w-[22.4px] h-[22.4px] rounded-full flex justify-center items-center',
              {
                ' border-[3px] border-black': selected === color,
                ' border-none': selected !== color,
              }
            )}
            style={{ backgroundColor: color }}
            id={color}
            onClick={(e) => {
              const color = e.currentTarget.id;
              setSelected(color);
              setValue('color', color);
            }}
          ></button>
        </li>
      ))}
    </div>
  );
}
