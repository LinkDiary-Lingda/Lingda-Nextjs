import React from 'react';
import { FaCirclePlus } from 'react-icons/fa6';

export default function LinkInput() {
  return (
    <div className="mt-6 w-[312px]  flex flex-row gap-2 items-center border-b-2 ">
      <FaCirclePlus size={20} color="#9E9E9E" />
      <input
        placeholder="링크 추가 하기 (선택사항)"
        className="w-[312px] h-[55px] outline-none"
      />
    </div>
  );
}
