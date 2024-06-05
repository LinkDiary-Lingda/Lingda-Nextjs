'use client';
import Content from './components/content';
import useTopic from '@/hooks/topic/useTopic';
import Nothing from './components/nothing';

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
