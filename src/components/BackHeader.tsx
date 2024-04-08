import { useRouter } from 'next/navigation';
import React from 'react';
import { IoMdArrowBack } from 'react-icons/io';

export default function BackHeader({ title }: { title: string }) {
  const router = useRouter();
  return (
    <nav>
      <ul className="flex flex-row justify-between items-center h-[48px]">
        <li
          className="text-Heading-3 cursor-pointer"
          onClick={router.back}
          aria-label="go-back-button"
        >
          <IoMdArrowBack />
        </li>
        <li>
          <p className="text-Heading-4" aria-label="title">
            {title}
          </p>
        </li>
        <li></li>
      </ul>
    </nav>
  );
}
