'use client';
import {
  deleteCategoryItem,
  getCategoryItems,
} from '@/service/categoroy/category';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function useCategory() {
  const { data }: any = useSession();
  const token = data.accessToken;
  const user = data.user.name;

  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: categoriesQuery } = useQuery({
    queryKey: ['categories', user],
    queryFn: () => getCategoryItems(token),
  });

  const { mutate: deleteCategoryItemQuery } = useMutation({
    mutationFn: (id: number) => deleteCategoryItem(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories', user] });
      toast.success('디바이더가 삭제되었습니다.');
    },
  });

  return { categoriesQuery, deleteCategoryItemQuery };
}
