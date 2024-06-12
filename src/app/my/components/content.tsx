'use client';
import Image from 'next/image';
import React from 'react';
import { FaCircle } from 'react-icons/fa';
import TopicButtons from './TopicButtons';
import { TopicItem } from '@/types/topic';
import { useRouter } from 'next/navigation';
import LinkComponent from './LinkComponent';

export default function Content({ topic }: { topic: TopicItem }) {
  const router = useRouter();
  const {
    name,
    id,
    color,
    categoryName,
    stared,
    contentResponses: { imageContents, textContents, urlContents },
  } = topic;

  return (
    <div
      aria-label="move-to-detail-page"
      className="py-8 border-b border-Outline-Low flex flex-col gap-4 cursor-pointer"
      onClick={() => router.push(`/topic/${id}`)}
    >
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-Heading-4 font-bold text-On-Surface-Primary">
            {name}
          </h2>
          <TopicButtons stared={stared} id={id} />
        </div>
        <div className="flex items-center gap-1 mt-1">
          <FaCircle color={color} size={14} />
          <p className="text-On-Surface-Third text-Body-2">{categoryName}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {urlContents.length > 0 && <LinkComponent urlContents={urlContents} />}
        <div>
          {textContents[0]?.text && (
            <article className="w-full text-On-Surface-Secondary text-Body-2 leading-Body-2 line-clamp-2">
              {textContents[0].text}
            </article>
          )}
        </div>
      </div>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide">
        {imageContents.length > 0 &&
          imageContents
            .filter((image) => image.imageUrl)
            .map((image) => (
              <button
                className="h-[80px] w-[80px] rounded-lg flex-shrink-0 overflow-hidden"
                key={image.imageUrl}
              >
                <Image
                  height={80}
                  width={80}
                  src={image.imageUrl}
                  alt="added-topic-image"
                  className="rounded-lg object-cover"
                />
              </button>
            ))}
      </div>
    </div>
  );
}
