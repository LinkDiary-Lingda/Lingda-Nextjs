'use client';
import React, { useEffect, useState } from 'react';
import { FaCircle } from 'react-icons/fa';
import TopicHeader from '../TopicHeader';
import Link, { LinkProps } from 'next/link';
import Image from 'next/image';
import useTopic from '@/hooks/topic/useTopic';
import { TopicItem } from '@/types/topic';
type Props = {
  params: { id: number };
};
export default function Page({ params: { id } }: Props) {
  const { topicDetailQuery } = useTopic();
  const [topic, setTopic] = useState<TopicItem>();
  useEffect(() => {
    async function getTopic() {
      const topic = await topicDetailQuery(id);
      setTopic(topic);
    }
    getTopic();
  }, [id, topicDetailQuery]);

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
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col gap-1 text-Blue-02 text-Body-1">
              {topic.contentResponses?.urlContents.length > 0 &&
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
                    <button className="h-24 w-24 rounded" key={image.imageUrl}>
                      <Image
                        className="rounded"
                        src="https://image.giftmoa.co.kr/images/noise_Lena.png"
                        height={96}
                        width={96}
                        alt="topic-image"
                      />
                    </button>
                  ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
