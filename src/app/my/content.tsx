import Image from 'next/image';
import React from 'react';
import { CiShare1 } from 'react-icons/ci';
import { FaCircle, FaRegStar, FaStar } from 'react-icons/fa';
import { IoIosLink } from 'react-icons/io';
import TopicButtons from './topicButtons';

export default function Content({ topic }: { topic: TopicItem }) {
  const {
    name,
    id,
    categoryName,
    stared,
    contentResponses: { imageContents, textContents, urlContents },
  } = topic;

  return (
    <div className="px-4 py-8 border-b-2 border-Gray-02 flex flex-col gap-4">
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-Heading-4 font-bold">{name}</h2>
          <TopicButtons stared={stared} id={id} />
        </div>
        <div className="flex items-center gap-1 mt-1">
          <FaCircle color="red" size={14} />
          <p className="text-Gray-06 text-Body-2">
            {categoryName || '전체 보기'}
          </p>
        </div>
      </div>
      <div className=" flex gap-2 items-center">
        <a href={urlContents[0].url} className="text-Blue-02 text-Body-1">
          {urlContents[0].url}
        </a>
        {urlContents.length > 1 && (
          <button className="flex items-center text-Gray-06 bg-Gray-02 px-2 py-1 rounded-full">
            <IoIosLink />
            <p>+{urlContents.length - 1}</p>
          </button>
        )}
      </div>
      <div>
        {textContents[0].text && (
          <article className="w-full text-Gray-08 text-Body-2 leading-Body-2">
            {textContents[0].text}
          </article>
        )}
      </div>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide">
        {imageContents.length > 0 &&
          imageContents
            .filter((image) => image.imageUrl)
            .map((image) => (
              <button
                className="h-[80px] w-[80px] rounded-lg bg-Gray-04 flex-shrink-0"
                key={image.imageUrl}
              >
                <Image
                  height={80}
                  width={80}
                  src={image.imageUrl}
                  alt="added-topic-image"
                />
              </button>
            ))}
      </div>
    </div>
  );
}
