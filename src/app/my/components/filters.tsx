'use client';
import React from 'react';
import cls from 'classnames';
import { useRecoilState } from 'recoil';
import { filtersTopic } from '@/atoms/topicState';

export default function Filters() {
  const [selectedFilters, setSelectedFilters] = useRecoilState(filtersTopic);

  const handleOnClick = (name: string) => {
    setSelectedFilters({
      ...selectedFilters,
      [name]: !selectedFilters[name],
    });
  };

  return (
    <ul className="flex flex-row gap-[10px] overflow-auto scrollbar-hide my-6">
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
  );
}
