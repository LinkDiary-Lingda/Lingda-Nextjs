'use client';
import { CategoryColor } from '@/types/category';
import React, { MouseEvent, useState } from 'react';
import cls from 'classnames';

export default function ColorPalete() {
  const [selected, setSelected] = useState<CategoryColor>('#F04242');

  return (
    <div className="flex gap-2 mt-2 -my-4">
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
            `w-5 h-5 m-1 rounded-full cursor-pointer bg-[${color}]`,
            {
              'border-black border-4': selected === color,
              '': selected !== color,
            }
          )}
          data-id={color}
          onClick={(e) => {
            setSelected(e.target.dataset.id);
          }}
        ></button>
      ))}
    </div>
  );
}
