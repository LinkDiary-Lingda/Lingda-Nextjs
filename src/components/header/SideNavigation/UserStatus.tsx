'use client';
import { currentOpenMenuState } from '@/atoms/modalState';
import MenuBox from '@/components/menu/MenuBox';
import { useMenuModalState } from '@/hooks/modal/useModalState';
import { logout } from '@/service/member';
import { signOut, useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { useRecoilValue } from 'recoil';
export default function UserStatus() {
  const { data }: any = useSession();
  const handleLoginBtn = async () => {
    const token = data?.accessToken;
    await logout(token);
    await signOut();
  };
  const { menuOn, closeMenu, openMenu } = useMenuModalState('user');
  const currentOpenMenu = useRecoilValue(currentOpenMenuState);

  const menus = [
    {
      title: '로그아웃하기',
      warning: true,
      handleClick: handleLoginBtn,
    },
  ];

  return (
    <div className="h-12 flex flex-row items-center justify-between">
      <button
        className="flex flex-row gap-1 items-center text-On-Surface-Third text-Body-1"
        aria-label="logout-button"
        onClick={() => {
          if (currentOpenMenu === `menu-user`) {
            closeMenu();
          } else {
            openMenu();
          }
        }}
      >
        {data?.user?.name && <span>{data.user.name}</span>}
        <IoIosArrowDown size={12} color="#9E9E9E" />
      </button>
      {currentOpenMenu === `menu-user` && <MenuBox menus={menus} />}
    </div>
  );
}
