'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import backArrow from '../../images/header-arrow.png';
import Image from 'next/image';

export default function BackHeader({ title }: { title: string }) {
  const router = useRouter();
  return (
    <nav>
      <ul className="flex flex-row justify-between items-center h-[48px] w-full">
        <li
          className="cursor-pointer"
          onClick={router.back}
          aria-label="go-back-button"
        >
          <Image src={backArrow} width={16} height={15} alt="back-button" />
        </li>
        <li>
          <p
            className="text-Heading-4 text-On-Surface-Primary font-bold"
            aria-label="title"
          >
            {title}
          </p>
        </li>
        <li>{''}</li>
      </ul>
    </nav>
  );
}
