'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Filters from '../../filters';
import useTopic from '@/hooks/topic/useTopic';
import Content from '../../content';
import Nothing from '../../nothing';
import { TopicItem } from '@/types/topic';
import { useCategoryContext } from '@/context/CategoryContext';

type Props = {
  params: { id: number | null; name: string };
};
export default function MyId({ params: { id, name } }: Props) {
  const [topics, setTopics] = useState<TopicItem[]>();
  const { categoryTopicQuery } = useTopic();
  const { setCategoryState } = useCategoryContext();

  useState(() => {
    async function getTopics() {
      const topics = await categoryTopicQuery(id);
      setTopics(topics);
    }
    setCategoryState({ id, name: decodeURI(name) });
    getTopics();
  }, [id]);

  return (
    <>
      {topics && (
        <>
          {topics.length > 0 ? (
            topics.map((topic) => <Content topic={topic} key={topic.id} />)
          ) : (
            <Nothing />
          )}
        </>
      )}
    </>
  );
}
