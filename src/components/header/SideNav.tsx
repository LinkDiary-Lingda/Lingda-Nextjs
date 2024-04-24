import React from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { GoPlus } from 'react-icons/go';
import Categories from './categories/Categories';

type Props = {
  handleBgClick: () => void;
};
export default function SideNav({ handleBgClick }: Props) {
  return (
    <section className="w-full absolute z-20">
      <div
        className="absolute left-2 w-full h-[100vh] bg-black opacity-30"
        onClick={handleBgClick}
      ></div>
      <div className="absolute w-[302px] h-[100vh] bg-white z-20 pl-6 pr-1">
        <div className="h-[48px] flex flex-row items-center justify-between">
          <button
            className="flex flex-row gap-1 items-center text-Gray-06 text-Body-1"
            aria-label="myInfo-button"
          >
            <span>Hamster1004</span>
            <FaChevronDown size={12} />
          </button>
          <button className="w-9 h-9 flex items-center justify-center">
            <GoPlus size={18} />
          </button>
        </div>
        <Categories />
        <div className="mt-6">
          <ul>
            <li className="h-9 flex items-center text-Body-2">
              버전 정보 V1.0
            </li>
            <li className="h-9 flex items-center text-Body-2">공지사항</li>
            <li className="h-9 flex items-center text-Body-2">고객센터</li>
            <li className="h-9 flex items-center text-Body-2">이용약관</li>
            <li className="h-9 flex items-center text-Body-2">환경설정</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
