'use client';
import React, { useEffect, useState } from 'react';
import { FaCircle } from 'react-icons/fa';
import TopicHeader from '../TopicHeader';
import Link from 'next/link';
import Image from 'next/image';
import useTopic from '@/hooks/topic/useTopic';
import { useQuery } from '@tanstack/react-query';
import closeBtn from '../../../images/photo-close-btn.png';
import { useRecoilState } from 'recoil';
import { currentTopicState } from '@/atoms/topicState';

type Props = {
  params: { id: number };
};
export default function Page({ params: { id } }: Props) {
  const { topicDetailQuery } = useTopic();
  const [photoModalOn, setPhotoModalOn] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { data: topic } = useQuery({
    queryKey: ['topics', id],
    queryFn: () => topicDetailQuery(id),
  });
  const [_, setCurrentTopic] = useRecoilState(currentTopicState);
  const handleImageClick = (imageUrl: string) => {
    setPhotoModalOn(true);
    setSelectedImage(imageUrl);
  };
  useEffect(() => {
    if (topic) {
      const newTopic = {
        name: topic.name,
        categoryId: topic.categoryId,
        categoryName: topic.categoryName,
        contentRequest: {
          textContents: topic.contentResponses?.textContents,
          imageContents: topic.contentResponses?.imageContents,
          urlContents: topic.contentResponses?.urlContents,
        },
      };

      setCurrentTopic(newTopic);
    }
  }, [setCurrentTopic, topic]);

  return (
    <div className="relative w-full h-full">
      <TopicHeader />
      {topic && (
        <>
          <div className="border-b-[1px] border-Outline-Low pb-12">
            <h1 className="text-Heading-2 font-bold">{topic.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <FaCircle color={topic.color} size={14} />
              <p className="text-On-Surface-Secondary text-Body-1">
                {topic.categoryName}
              </p>
            </div>
          </div>
          {topic.contentResponses && (
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex flex-col gap-1 text-Success text-Body-1 leading-Body-1">
                {topic.contentResponses.urlContents.length > 0 &&
                  topic.contentResponses.urlContents.map(({ url }, index) => (
                    <Link href={url} key={url + index}>
                      {url}
                    </Link>
                  ))}
              </div>
              <div>
                <article className="text-Body-1 text-On-Surface-Primary leading-Body-1">
                  {topic.contentResponses.textContents &&
                    topic.contentResponses.textContents[0]?.text}
                </article>
              </div>
              <div className="shrink-0 gap-3 flex">
                {topic.contentResponses.imageContents.length > 0 &&
                  topic.contentResponses.imageContents
                    .filter((image) => image.imageUrl)
                    .map((image) => (
                      <button
                        className="h-24 w-24 rounded overflow-hidden"
                        key={image.imageUrl}
                        onClick={() => handleImageClick(image.imageUrl)}
                      >
                        <Image
                          className="rounded object-cover"
                          src={image.imageUrl}
                          height={96}
                          width={96}
                          alt="topic-image"
                        />
                      </button>
                    ))}
              </div>
              {photoModalOn && selectedImage && (
                <div
                  className="fixed bg-opacity-80 bg-black top-0 translate -translate-x-6 z-30 max-w-[490px] w-full h-full flex flex-col justify-center"
                  onClick={() => setPhotoModalOn(false)}
                >
                  <div
                    className="flex flex-col items-center relative"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <button
                      className="w-full flex justify-end mr-6"
                      aria-label="close-button"
                      onClick={() => setPhotoModalOn(false)}
                    >
                      <Image
                        src={closeBtn}
                        width={24}
                        height={24}
                        alt="close-btn"
                      />
                    </button>
                    <div className="relative w-full h-0 pb-[100%]">
                      <Image
                        src={selectedImage}
                        fill
                        sizes="100vw"
                        alt="selected-image"
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <div className="w-full flex gap-3 overflow-x-scroll scrollbar-hide mt-6 ml-6">
                      {topic.contentResponses.imageContents.length > 0 &&
                        topic.contentResponses.imageContents
                          .filter((image) => image.imageUrl)
                          .map((image) => (
                            <button
                              className="h-24 w-24 rounded overflow-hidden shrink-0"
                              key={image.imageUrl}
                              onClick={() => handleImageClick(image.imageUrl)}
                            >
                              <Image
                                className="rounded object-cover"
                                src={image.imageUrl}
                                height={96}
                                width={96}
                                alt="topic-image"
                              />
                            </button>
                          ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
