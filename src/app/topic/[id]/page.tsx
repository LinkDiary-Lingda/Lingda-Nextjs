'use client';
import React, { useEffect, useState } from 'react';
import { FaCircle } from 'react-icons/fa';
import TopicHeader from '../TopicHeader';
import Link from 'next/link';
import Image from 'next/image';
import useTopic from '@/hooks/topic/useTopic';
import { TopicItem } from '@/types/topic';
type Props = {
  params: { id: number };
};
export default function Page({ params: { id } }: Props) {
  const { topicDetailQuery } = useTopic();
  const [topic, setTopic] = useState<TopicItem>();
  const [photoModalOn, setPhotoModalOn] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  useEffect(() => {
    async function getTopic() {
      const topic = await topicDetailQuery(id);
      setTopic(topic);
    }
    getTopic();
  }, [id, topicDetailQuery]);

  const handleImageClick = (imageUrl: string) => {
    setPhotoModalOn(true);
    setSelectedImage(imageUrl);
  };

  return (
    <section className="mx-6">
      <TopicHeader />
      {topic && (
        <>
          <div className="border-b-[1px] border-Gray-03 pb-12">
            <h1 className="text-Heading-2 font-pretendardBold">{topic.name}</h1>
            <div className="flex items-center gap-1 mt-1">
              <FaCircle color={topic.color} size={14} />
              <p className="text-Gray-06 text-Body-1">
                {topic.categoryName || '전체보기'}
              </p>
            </div>
          </div>
          {topic.contentResponses && (
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex flex-col gap-1 text-Blue-02 text-Body-1">
                {topic.contentResponses.urlContents.length > 0 &&
                  topic.contentResponses.urlContents.map(({ url }) => (
                    <Link href={url} key={url}>
                      {url}
                    </Link>
                  ))}
              </div>
              <div>
                <article className="text-Body-1">
                  {topic.contentResponses.textContents &&
                    topic.contentResponses.textContents[0].text}
                </article>
              </div>
              <div className="shrink-0 gap-3 grid grid-cols-3">
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
                  className="bg-opacity-50 bg-black z-30 w-[360px] h-[100vh] absolute top-0 -ml-8 flex flex-col justify-center items-center"
                  onClick={() => setPhotoModalOn(false)}
                >
                  <div
                    className="flex flex-col justify-center items-center"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Image
                      src={selectedImage}
                      width={280}
                      height={300}
                      alt="selected-image"
                    />
                    <div className="w-[330px] flex gap-3 overflow-x-scroll scrollbar-hide mt-6 ml-6">
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
    </section>
  );
}
