'use client';
import React, { useEffect, useState } from 'react';
import useTopic from '@/hooks/topic/useTopic';
import Content from '../../components/content';
import Nothing from '../../components/nothing';
import { useRecoilState } from 'recoil';
import { currentCategoryState } from '@/atoms/categoryState';
import { useQuery } from '@tanstack/react-query';

type Props = {
  params: { id: number | null; name: string };
};
export default function MyId({ params: { id, name } }: Props) {
  const { categoryTopicQuery } = useTopic();
  const [currentCategory, setCurrentCategory] =
    useRecoilState(currentCategoryState);

  useEffect(() => {
    setCurrentCategory({ id, name: decodeURI(name) });
  }, [id, name, setCurrentCategory]);

  const { data: topics } = useQuery({
    queryKey: ['topics', id],
    queryFn: () => categoryTopicQuery(id),
  });

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
