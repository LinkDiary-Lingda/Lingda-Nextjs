'use client';
import Content from './components/content';
import useTopic from '@/hooks/topic/useTopic';
import Nothing from './components/nothing';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { currentCategoryState } from '@/atoms/categoryState';

export default function My() {
  const { topicQuery } = useTopic();
  const [_, setCurrentCategory] = useRecoilState(currentCategoryState);

  useEffect(() => {
    setCurrentCategory(null);
  }, [setCurrentCategory]);
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
