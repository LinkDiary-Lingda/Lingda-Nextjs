'use client';
import React, { useEffect, useState } from 'react';
import useTopic from '@/hooks/topic/useTopic';
import Content from '../../components/content';
import Nothing from '../../components/nothing';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentCategoryState } from '@/atoms/categoryState';
import { useQuery } from '@tanstack/react-query';
import { filtersTopic } from '@/atoms/topicState';
import { TopicItem } from '@/types/topic';

type Props = {
  params: { id: number | null; name: string };
};
export default function MyId({ params: { id, name } }: Props) {
  const { categoryTopicQuery } = useTopic();
  const [_, setCurrentCategory] = useRecoilState(currentCategoryState);
  const selectedFilters = useRecoilValue(filtersTopic);
  const [filteredTopics, setFilteredTopics] = useState<TopicItem[]>([]);

  useEffect(() => {
    setCurrentCategory({ id, name: decodeURI(name) });
    if (topics) {
      let newFilteredTopics = [...topics];
      if (selectedFilters.starred) {
        newFilteredTopics = newFilteredTopics.filter((topic) => topic.stared);
      }
      if (selectedFilters.link) {
        newFilteredTopics = newFilteredTopics.filter(
          (topic) => topic.contentResponses.urlContents.length > 0
        );
      }
      if (selectedFilters.text) {
        newFilteredTopics = newFilteredTopics.filter(
          (topic) => topic.contentResponses.textContents.length > 0
        );
      }
      if (selectedFilters.image) {
        newFilteredTopics = newFilteredTopics.filter(
          (topic) => topic.contentResponses.imageContents.length > 0
        );
      }
      setFilteredTopics(newFilteredTopics);
    }
  }, [id, name, setCurrentCategory, selectedFilters]);

  const { data: topics } = useQuery({
    queryKey: ['topics', id],
    queryFn: () => categoryTopicQuery(id),
  });

  return (
    <>
      {filteredTopics && (
        <>
          {filteredTopics.length > 0 ? (
            filteredTopics.map((topic, index) => {
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
