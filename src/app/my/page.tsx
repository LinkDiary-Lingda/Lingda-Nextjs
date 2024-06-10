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
            topicQuery.map((topic, index) => {
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
