import React from 'react';

import Categories from '../categories/Categories';
import UserStatus from './UserStatus';

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
        <UserStatus />
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
