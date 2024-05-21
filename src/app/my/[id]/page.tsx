import React from 'react';
import Link from 'next/link';
import Filters from '../filters';
import useTopic from '@/hooks/topic/useTopic';
import Content from '../content';

type Props = {
  params: { id: number | null };
};
export default async function MyId({ params }: Props) {
  const { id } = params;
  const { topicQuery } = useTopic();

  return (
    <>
      {topicQuery && (
        <>
          {topicQuery.length > 0 &&
            topicQuery.map((topic) => <Content topic={topic} key={topic.id} />)}
        </>
      )}
    </>
  );
}
