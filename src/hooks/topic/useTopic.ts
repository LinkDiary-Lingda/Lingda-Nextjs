'use client';
import {
  cancelStarTopic,
  createTopic,
  getTopic,
  getTopics,
  starTopic,
  updateImage,
} from '@/service/topic';
import { TopicItem } from '@/types/topic';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';

export default function useTopic() {
  const { data }: any = useSession();
  const token = data?.accessToken;
  const user = data?.user.name;

  const router = useRouter();

  const queryClient = useQueryClient();

  const { data: topicQuery } = useQuery({
    queryKey: ['topics', user, null],
    queryFn: () => getTopics(null, token),
  });

  const { mutateAsync: topicDetailQuery } = useMutation({
    mutationFn: (id: number) => getTopic(id, token),
  });

  const { mutateAsync: categoryTopicQuery } = useMutation({
    mutationFn: (categoryId: number | null) => getTopics(categoryId, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topics', user] });
    },
  });

  const { mutate: createTopicQuery } = useMutation({
    mutationFn: (
      item: Omit<
        TopicItem,
        'id' | 'categoryName' | 'stared' | 'createdDate' | 'updatedDate'
      >
    ) => createTopic(item, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topics', user] });
      toast('토픽이 생성되었습니다.');
      router.back();
    },
  });

  const { mutateAsync: updateImageQuery } = useMutation({
    mutationFn: (data: { imageBody: any; name: string }) =>
      updateImage({ ...data, token }),
  });

  const { mutate: starTopicQuery } = useMutation({
    mutationFn: (id: number) => starTopic(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topics', user] });
    },
  });

  const { mutate: cancelStarTopicQuery } = useMutation({
    mutationFn: (id: number) => cancelStarTopic(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topics', user] });
    },
  });

  return {
    topicQuery,
    categoryTopicQuery,
    topicDetailQuery,
    createTopicQuery,
    updateImageQuery,
    starTopicQuery,
    cancelStarTopicQuery,
  };
}
