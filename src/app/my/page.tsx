'use client';
import Content from './components/content';
import useTopic from '@/hooks/topic/useTopic';
import Nothing from './components/nothing';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentCategoryState } from '@/atoms/categoryState';
import { filtersTopic } from '@/atoms/topicState';
import { TopicItem } from '@/types/topic';

export default function My() {
  const { topicQuery } = useTopic();
  const [_, setCurrentCategory] = useRecoilState(currentCategoryState);
  const selectedFilters = useRecoilValue(filtersTopic);
  const [filteredTopics, setFilteredTopics] = useState<TopicItem[]>([]);

  useEffect(() => {
    setCurrentCategory(null);
    if (topicQuery) {
      let newFilteredTopics = [...topicQuery];
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
  }, [setCurrentCategory, selectedFilters]);

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
