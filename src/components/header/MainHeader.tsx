import React from 'react';
import { BiSearch } from 'react-icons/bi';
import { BsStack } from 'react-icons/bs';

export default function MainHeader() {
  return (
    <nav>
      <ul className="flex flex-row justify-between bg-red-400">
        <li>
          <BsStack />
        </li>
        <li>
          <h1>Lingda</h1>
        </li>
        <li>
          <BiSearch />
        </li>
      </ul>
    </nav>
  );
}
