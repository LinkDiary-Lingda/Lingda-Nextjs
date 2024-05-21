'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoMdArrowBack } from 'react-icons/io';

export default function TopicHeader() {
  const handleMenuBtn = () => {};
  const router = useRouter();
  return (
    <nav>
      <ul className="flex flex-row justify-between items-center h-[48px] w-full">
        <li
          className="text-Heading-3 cursor-pointer"
          onClick={router.back}
          aria-label="go-back-button"
        >
          <IoMdArrowBack />
        </li>
        <li>
          <p className="text-Heading-4" aria-label="title">
            {''}
          </p>
        </li>
        <li>
          <button
            type="button"
            aria-label="edit-button"
            className="outline-none p-2"
            onClick={handleMenuBtn}
          >
            <BsThreeDotsVertical color="#9E9E9E" />
          </button>
        </li>
      </ul>
    </nav>
  );
}
