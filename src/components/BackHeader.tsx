import { useRouter } from 'next/navigation';
import React from 'react';
import { IoMdArrowBack } from 'react-icons/io';

export default function BackHeader({ title }: { title: string }) {
  const router = useRouter();
  return (
    <nav>
      <ul className="flex flex-row justify-between items-center">
        <li className="text-Heading-3" onClick={router.back}>
          <IoMdArrowBack />
        </li>
        <li>
          <p className="text-Heading-4">{title}</p>
        </li>
        <li></li>
      </ul>
    </nav>
  );
}
