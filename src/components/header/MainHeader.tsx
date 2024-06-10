'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import SideNav from './SideNavigation/SideNav';
import headerMenu from '../../images/header-menu.png';
import Image from 'next/image';
import headerSearch from '../../images/header-search.png';
import { useRecoilState } from 'recoil';
import { sideNavState } from '@/atoms/sideNavState';

export default function MainHeader() {
  const [searchOn, setSearchOn] = useState(false);
  const [sideNavOn, setSideNavOn] = useRecoilState(sideNavState);
  const handleBgClick = () => {
    setSideNavOn(false);
  };
  return (
    <>
      <div className="relative">
        <SideNav handleBgClick={handleBgClick} />
      </div>
      <nav>
        <ul className="flex flex-row justify-between items-center h-[48px]">
          <li>
            <button
              type="button"
              aria-label="menu-button"
              className="flex justify-center items-center"
              onClick={() => setSideNavOn(!sideNavOn)}
            >
              <Image
                src={headerMenu}
                width={24}
                height={24}
                alt="menu-button"
              />
            </button>
          </li>
          <li>
            <Link
              className="font-gmarketBold text-Heading-4 text-Primary-03"
              href="/my"
            >
              Lingda
            </Link>
          </li>
          <li>
            <button
              type="button"
              aria-label="search-button"
              className="flex justify-center items-center"
              onClick={() => setSearchOn(!searchOn)}
            >
              <Image
                src={headerSearch}
                width={24}
                height={24}
                alt="search-button"
              />
            </button>
          </li>
        </ul>
      </nav>
      {searchOn && (
        <div className="w-full flex items-center justify-center mt-4">
          <form
            className="w-full"
            onSubmit={(e) => {
              e.preventDefault();
              console.log('hi, easter eggs event!');
            }}
          >
            <input
              type="text"
              className="w-full h-[44px] bg-Gray-02 rounded-md outline-none px-4 text-Body-2 placeholder:font-medium placeholder:text-On-Surface-Third text-On-Surface-Primary font-semibold"
              placeholder="검색어를 입력하세요."
            />
            <button type="submit" className="hidden">
              검색
            </button>
          </form>
        </div>
      )}
    </>
  );
}
