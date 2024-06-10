import Image from 'next/image';
import React from 'react';
import nothingImg from '../../../images/lingda-exclamation.png';

export default function Nothing() {
  return (
    <div className="flex flex-col justify-center items-center h-[500px]">
      <Image
        src={nothingImg}
        alt="nothing-image"
        width={104}
        height={104}
        placeholder="blur"
        priority
      />
      <div className="flex flex-col items-center mt-6 text-On-Surface-Primary text-Body-1 leading-Body-1">
        <p>앗, 토픽이 없네요.</p>
        <p>아래 추가 버튼을 통해 토픽을 생성해보세요!</p>
      </div>
    </div>
  );
}
