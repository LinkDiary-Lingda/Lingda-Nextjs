'use client';
import Content from './content';
import useTopic from '@/hooks/topic/useTopic';
import Nothing from './nothing';

export default function My() {
  const { topicQuery } = useTopic();

  return (
    <>
      {topicQuery && (
        <>
          {topicQuery.length > 0 ? (
            topicQuery.map((topic) => <Content topic={topic} key={topic.id} />)
          ) : (
            <Nothing />
          )}
        </>
      )}
    </>
  );
}
