import React, { DragEvent } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaChevronDown, FaCircle } from 'react-icons/fa';
import { GoPlus } from 'react-icons/go';
import DividerItem from './categories/DividerItem';
import Categories from './categories/Categories';

export default function SideNav() {
  const dragOverHandler = (e) => {
    e.preventDefault();
    console.log('hihih');
  };

  const dropHandler = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    console.log('dropped!!!');
    console.log(e.target.dataset.id);
  };
  return (
    <section className="w-full absolute px-2 z-20">
      <div className="absolute w-full h-[100vh] bg-black opacity-30"></div>
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
