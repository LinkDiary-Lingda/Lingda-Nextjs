'use client';
import React from 'react';
import Categories from '../categories/Categories';
import UserStatus from './UserStatus';
import { useRecoilState } from 'recoil';
import { sideNavState } from '@/atoms/sideNavState';

type Props = {
  handleBgClick: () => void;
};
export default function SideNav({ handleBgClick }: Props) {
  const [sideNavOn, setSideNavOn] = useRecoilState(sideNavState);
  return (
    <section
      // 슬라이드 애니메이션 작업중이었음...
      className={`w-full absolute z-10 transition-all ease-in duration-300 left-6 ${
        sideNavOn ? ' visible' : 'hidden'
      }`}
    >
      <div
        className="absolute w-full h-[100vh] bg-black opacity-30"
        onClick={handleBgClick}
      ></div>
      <div className="absolute min-w-[302px] flex flex-col h-[100vh] bg-white z-20 pr-1 -translate-x-6">
        <UserStatus />
        <Categories />
        <div className="mt-6">
          <ul>
            <li className="h-9 flex items-center text-Body-2">
              버전 정보 V1.0
            </li>
            {/* <li className="h-9 flex items-center text-Body-2">공지사항</li>
            <li className="h-9 flex items-center text-Body-2">고객센터</li>
            <li className="h-9 flex items-center text-Body-2">이용약관</li>
            <li className="h-9 flex items-center text-Body-2">환경설정</li> */}
          </ul>
        </div>
      </div>
    </section>
  );
}
