'use client';
import React, { useState } from 'react';
import cls from 'classnames';

type Category = {
  [str: string]: boolean;
};

export default function Filters() {
  const [selectedFilters, setSelectedFilters] = useState<Category>({
    starred: false,
    link: false,
    text: false,
    image: false,
  });
  const handleOnClick = (name: string) => {
    setSelectedFilters({
      ...selectedFilters,
      [name]: !selectedFilters[name],
    });
    switch (name) {
    }
  };
  return (
    <div className="my-6">
      <ul className="flex flex-row gap-[10px] overflow-auto scrollbar-hide">
        {Object.keys(selectedFilters).map((filter) => {
          let txt = '';
          switch (filter) {
            case 'starred':
              txt = '즐겨찾기만';
              break;
            case 'link':
              txt = '링크';
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
                'px-[18px] py-[5px] rounded-full w-fit flex-shrink-0 cursor-pointer font-semibold text-Body-2',
                {
                  'bg-Primary-Container text-On-Primary-Container':
                    selectedFilters[filter],
                  'bg-Surface-Container-Low text-On-Surface-Third':
                    !selectedFilters[filter],
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
