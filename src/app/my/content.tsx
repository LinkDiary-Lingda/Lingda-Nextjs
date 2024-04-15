import React from 'react';
import { CiShare1 } from 'react-icons/ci';
import { FaCircle, FaRegStar, FaStar } from 'react-icons/fa';
import { IoIosLink } from 'react-icons/io';

export default function Content() {
  return (
    <div className="px-4 py-8 border-b-2 border-Gray-02 flex flex-col gap-4">
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-Heading-4 font-bold">내 손안의 링크 다이어리</h2>
          <div className="flex gap-3">
            <button type="button" aria-label="star-button">
              <FaStar color="#57E5C3" size={16} />
            </button>
            <button type="button" aria-label="share-button">
              <CiShare1 color="#9E9E9E" size={16} />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <FaCircle color="red" size={14} />
          <p className="text-Gray-06 text-Body-2">진짜 핵심 모음집</p>
        </div>
      </div>
      <div className=" flex gap-2 items-center">
        <a href="http://localhost:3000" className="text-Blue-02 text-Body-1">
          http://localhost:3000
        </a>
        <button className="flex items-center text-Gray-06 bg-Gray-02 px-2 py-1 rounded-full">
          <IoIosLink />
          <p>+2</p>
        </button>
      </div>
      <div>
        <article className="w-full text-Gray-08 text-Body-2 leading-Body-2">
          안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕
          안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕
        </article>
      </div>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide">
        <p className="h-[80px] w-[80px] rounded-lg bg-Gray-04 flex-shrink-0"></p>
        <p className="h-[80px] w-[80px] rounded-lg bg-Gray-04 flex-shrink-0"></p>
        <p className="h-[80px] w-[80px] rounded-lg bg-Gray-04 flex-shrink-0"></p>
        <p className="h-[80px] w-[80px] rounded-lg bg-Gray-04 flex-shrink-0"></p>
        <p className="h-[80px] w-[80px] rounded-lg bg-Gray-04 flex-shrink-0"></p>
        <p className="h-[80px] w-[80px] rounded-lg bg-Gray-04 flex-shrink-0"></p>
        <p className="h-[80px] w-[80px] rounded-lg bg-Gray-04 flex-shrink-0"></p>
        <p className="h-[80px] w-[80px] rounded-lg bg-Gray-04 flex-shrink-0"></p>
        <p className="h-[80px] w-[80px] rounded-lg bg-Gray-04 flex-shrink-0"></p>
        <p className="h-[80px] w-[80px] rounded-lg bg-Gray-04 flex-shrink-0"></p>
      </div>
    </div>
  );
}
