'use client';
import React from 'react';
import Categories from '../categories/Categories';
import UserStatus from './UserStatus';
import { useRecoilState } from 'recoil';
import { sideNavState } from '@/atoms/sideNavState';
import { useMenuModalState } from '@/hooks/modal/useModalState';

export default function SideNav() {
  const [sideNavOn, setSideNavOn] = useRecoilState(sideNavState);
  const { closeMenu } = useMenuModalState('sideNav');
  const handleBgClick = () => {
    setSideNavOn(false);
    closeMenu();
  };
  return (
    <section
      // 슬라이드 애니메이션 작업중이었음...
      className={`w-screen max-w-[490px] absolute z-10 transition-all ease-in duration-300 -left-6 flex flex-row ${
        sideNavOn ? ' visible' : 'hidden'
      }`}
    >
      <div className="w-10/12 h-[100vh] bg-white z-20 flex flex-col px-6">
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
      <div
        className="w-2/12 h-[100vh] bg-black opacity-30 flex flex-1"
        onClick={handleBgClick}
      ></div>
    </section>
  );
}
