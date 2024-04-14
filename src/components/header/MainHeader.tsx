import React from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';

export default function MainHeader() {
  return (
    <nav>
      <ul className="flex flex-row justify-between items-center h-[48px]">
        <li>
          <button
            type="button"
            aria-label="menu-button"
            className="h-[48px] w-[48px] flex justify-center items-center"
          >
            <AiOutlineMenu size={24} />
          </button>
        </li>
        <li>
          <button type="button" aria-label="home-button">
            <h1 className="font-gmarketBold text-Heading-4 text-Primary-04">
              Lingda
            </h1>
          </button>
        </li>
        <li>
          <button
            type="button"
            aria-label="search-button"
            className="h-[48px] w-[48px] flex justify-center items-center"
          >
            <BiSearch size={24} />
          </button>
        </li>
      </ul>
    </nav>
  );
}
