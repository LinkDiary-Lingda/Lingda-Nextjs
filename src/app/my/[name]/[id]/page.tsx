'use client';
import React, { useEffect, useState } from 'react';
import useTopic from '@/hooks/topic/useTopic';
import Content from '../../components/content';
import Nothing from '../../components/nothing';
import { TopicItem } from '@/types/topic';
import { useCategoryContext } from '@/context/CategoryContext';

type Props = {
  params: { id: number | null; name: string };
};
export default function MyId({ params: { id, name } }: Props) {
  const [topics, setTopics] = useState<TopicItem[]>();
  const { categoryTopicQuery } = useTopic();
  const { setCategoryState } = useCategoryContext();

  useEffect(() => {
    async function getTopics() {
      const topics = await categoryTopicQuery(id);
      setTopics(topics);
    }
    setCategoryState({ id, name: decodeURI(name) });
    getTopics();
  }, [id, name, categoryTopicQuery, setCategoryState]);

  return (
    <>
      {topics && (
        <>
          {topics.length > 0 ? (
            topics.map((topic, index) => {
              if (index === 0) {
                return (
                  <div className="-mt-6" key={topic.id}>
                    <Content topic={topic} />
                  </div>
                );
              }
              return <Content topic={topic} key={topic.id} />;
            })
          ) : (
            <Nothing />
          )}
        </>
      )}
    </>
  );
}
