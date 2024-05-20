'use client';
import { getTopics } from '@/service/topic';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import React from 'react';

export default function useTopic() {
  const { data }: any = useSession();
  const token = data.accessToken;
  const user = data.user.name;

  const queryClient = useQueryClient();

  const { mutate: topicQuery } = useMutation({
    mutationFn: (categoryId: number | null) => getTopics(categoryId, token),
    onSuccess: (data, categoryId) => {
      queryClient.invalidateQueries({ queryKey: ['topics', user, categoryId] });
    },
  });
  return { topicQuery };
}
