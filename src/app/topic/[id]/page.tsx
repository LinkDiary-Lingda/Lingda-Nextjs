import React from 'react';
import { FaCircle } from 'react-icons/fa';
import TopicHeader from '../TopicHeader';

export default function page() {
  return (
    <>
      <TopicHeader />
      <div>
        <h1 className="text-Heading-2 font-pretendardBold">햄스터 톱밥</h1>
        <div className="flex items-center gap-1 mt-1">
          <FaCircle color="red" size={14} />
          <p className="text-Gray-06 text-Body-1">햄스터 키우기</p>
        </div>
      </div>
    </>
  );
}
