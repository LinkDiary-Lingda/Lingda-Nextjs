import { UrlContent } from '@/types/topic';
import Image from 'next/image';
import React from 'react';
import iosChain from '../../../images/ios-chain.png';
import Link from 'next/link';
type Props = {
  urlContents: UrlContent[];
};

export default function LinkComponent({ urlContents }: Props) {
  return (
    <div className="flex gap-2 items-center">
      <Link
        href={urlContents[0].url}
        className="text-Success text-Body-1 truncate"
        target="_blank"
        rel="noopener noreferrer nofollow"
        onClick={(e) => {
          e.preventDefault();
          window.open(urlContents[0].url);
        }}
      >
        {urlContents[0].url}
      </Link>
      {urlContents.length > 1 && (
        <button className="flex items-center bg-Surface-Container-Low text-On-Surface-Third text-Body-2 px-2 py-1 rounded-sm gap-[2px] flex-shrink-0">
          <Image src={iosChain} fill alt="link-indicator" />
          <p>+{urlContents.length - 1}</p>
        </button>
      )}
    </div>
  );
}
