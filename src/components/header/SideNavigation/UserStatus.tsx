'use client';
import MenuBox from '@/components/menu/MenuBox';
import { logout } from '@/service/member';
import { signOut, useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
export default function UserStatus() {
  const { data }: any = useSession();
  const [isToggled, setIsToggled] = useState(false);
  const handleLoginBtn = async () => {
    const token = data?.accessToken;
    await logout(token);
    await signOut();
  };
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
        className="flex flex-row gap-1 items-center text-Gray-06 text-Body-1"
        aria-label="logout-button"
        onClick={() => setIsToggled(!isToggled)}
      >
        {data?.user?.name && <span>{data.user.name}</span>}
        <FaChevronDown size={12} />
      </button>
      {isToggled && <MenuBox menus={menus} />}
    </div>
  );
}