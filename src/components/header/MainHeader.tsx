'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import SideNav from './SideNav';

export default function MainHeader() {
  const [searchOn, setSearchOn] = useState(false);
  const [menuOn, setMenuOn] = useState(false);
  const handleBgClick = () => {
    setMenuOn(false);
  };
  return (
    <>
      <div className="relative">
        {menuOn && <SideNav handleBgClick={handleBgClick} />}
      </div>
      <nav>
        <ul className="flex flex-row justify-between items-center h-[48px]">
          <li>
            <button
              type="button"
              aria-label="menu-button"
              className="h-[48px] w-[48px] flex justify-center items-center"
              onClick={() => setMenuOn(!menuOn)}
            >
              <AiOutlineMenu size={24} />
            </button>
          </li>
          <li>
            <Link
              className="font-gmarketBold text-Heading-4 text-Primary-04"
              href="http://localhost:3000"
            >
              Lingda
            </Link>
          </li>
          <li>
            <button
              type="button"
              aria-label="search-button"
              className="h-[48px] w-[48px] flex justify-center items-center"
              onClick={() => setSearchOn(!searchOn)}
            >
              <BiSearch size={24} />
            </button>
          </li>
        </ul>
      </nav>
      {searchOn && (
        <div className="flex items-center justify-center mt-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log('hi');
            }}
          >
            <input
              type="text"
              className="w-[312px] h-[44px] bg-Gray-02 rounded-md outline-none px-4 text-Body-2"
              placeholder="검색어를 입력하세요."
            />
          </form>
        </div>
      )}
    </>
  );
}
