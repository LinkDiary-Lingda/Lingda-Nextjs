'use client';
import React, { useState } from 'react';
import cls from 'classnames';

type Category = {
  [str: string]: boolean;
};

export default function Filters() {
  const [selectedFilters, setSelectedFilters] = useState<Category>({
    starred: false,
    label: false,
    text: false,
    image: false,
  });
  const handleOnClick = (name: string) => {
    setSelectedFilters({
      ...selectedFilters,
      [name]: !selectedFilters[name],
    });
  };
  return (
    <div className="mt-6">
      <ul className="flex flex-row gap-2 overflow-auto scrollbar-hide ml-4">
        {Object.keys(selectedFilters).map((filter) => {
          let txt = '';
          switch (filter) {
            case 'starred':
              txt = '즐겨찾기만';
              break;
            case 'label':
              txt = 'Label';
              break;
            case 'text':
              txt = '텍스트';
              break;
            case 'image':
              txt = '이미지';
              break;
            default:
              break;
          }
          return (
            <li
              key={txt}
              className={cls(
                'px-5 py-1 rounded-full w-fit flex-shrink-0 cursor-pointer font-semibold text-Body-2',
                {
                  'bg-Primary-01 text-Primary-04': selectedFilters[filter],
                  'bg-Gray-02 text-Gray-06': !selectedFilters[filter],
                }
              )}
              onClick={() => handleOnClick(filter)}
            >
              {txt}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
