'use client';
import MenuBox from '@/components/menu/menuBox';
import { useSession } from 'next-auth/react';
import React from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { GoPlus } from 'react-icons/go';
export default function UserStatus() {
  const { data } = useSession();
  const menus = [
    {
      title: '로그아웃하기',
      warning: true,
      handleClick: () => {},
    },
  ];

  return (
    <div className="h-12 flex flex-row items-center justify-between">
      <button
        className="flex flex-row gap-1 items-center text-Gray-06 text-Body-1"
        aria-label="myInfo-button"
      >
        {data?.user?.name && <span>{data.user.name}</span>}
        <FaChevronDown size={12} />
      </button>
      <MenuBox menus={menus} />
      <button className="w-9 h-9 flex items-center justify-center">
        <GoPlus size={18} />
      </button>
    </div>
  );
}
