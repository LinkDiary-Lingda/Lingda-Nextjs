'use client';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import splashImage from '../images/lingda-splash.png';
import Image from 'next/image';
import anime from 'animejs';

type Props = {
  finishLoading: () => void;
};
export default function SplashScreen({ finishLoading }: Props) {
  useEffect(() => {
    const loader = anime.timeline({
      complete: () => finishLoading(),
    });
    loader.add({
      targets: '#logo',
      delay: 0,
      scale: 1.5,
      duration: 3000,
      easing: 'easeInOutExpo',
    });
  });
  return (
    <div className="absolute w-full h-full bg-Primary2 flex justify-center items-center">
      <Image
        src={splashImage}
        width={148}
        height={44}
        alt="Lingda-app-name"
        id="logo"
      />
    </div>
  );
}
