import Image from 'next/image';
import React from 'react';
import nothingImg from '../../images/lingda-exclamation.png';

export default function Nothing() {
  return (
    <div className="flex flex-col justify-center items-center h-[500px]">
      <Image src={nothingImg} alt="nothing-image" width={104} height={104} />
      <div className="flex flex-col items-center mt-6">
        <p>일치하는 정보와</p>
        <p>일치하는 검색 결과가 없습니다.</p>
      </div>
    </div>
  );
}
