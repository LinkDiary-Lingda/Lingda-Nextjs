'use client';
import { createTopic, getTopics } from '@/service/topic';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import React from 'react';
import { toast } from 'react-toastify';

export default function useTopic() {
  const { data }: any = useSession();
  const token = data?.accessToken;
  const user = data?.user.name;

  const queryClient = useQueryClient();

  const { data: topicQuery } = useQuery({
    queryKey: ['topics', user, null],
    queryFn: () => getTopics(null, token),
  });

  const { mutate: categoryTopicQuery } = useMutation({
    mutationFn: (categoryId: number | null) => getTopics(categoryId, token),
    onSuccess: (data, categoryId) => {
      queryClient.invalidateQueries({ queryKey: ['topics', user, categoryId] });
    },
  });

  const { mutate: createTopicQuery } = useMutation({
    mutationFn: (
      item: Omit<
        TopicItem,
        'id' | 'categoryName' | 'stared' | 'createdDate' | 'updatedDate'
      >
    ) => createTopic(item, token),
    onSuccess: (data, { categoryId }) => {
      queryClient.invalidateQueries({ queryKey: ['topics', user, categoryId] });
      toast('토픽이 생성되었습니다.');
    },
  });
  return { topicQuery, categoryTopicQuery, createTopicQuery };
}
