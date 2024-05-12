'use client';
import {
  EditItem,
  createCategoryItem,
  deleteCategoryItem,
  editCategoryItem,
  getCategoryItems,
} from '@/service/categoroy/category';
import { CategoryItem } from '@/types/category';
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

  const { data: createCategoryQuery } = useMutation({
    mutationFn: (data: CategoryItem) => createCategoryItem(data, token),
    onSuccess: (data, { type }) => {
      queryClient.invalidateQueries({ queryKey: ['categories', user] });
      type === 'CATEGORY'
        ? toast('카테고리가 생성되었습니다.')
        : toast('디바이더가 생성되었습니다.');
    },
  });

  const { data: editCategoryItemQuery } = useMutation({
    mutationFn: (data: EditItem) => editCategoryItem({ ...data, token }),
    onSuccess: (data, { color }) => {
      queryClient.invalidateQueries({ queryKey: ['categories', user] });
      color
        ? toast('카테고리가 수정되었습니다.')
        : toast('디바이더가 수정되었습니다.');
    },
  });

  const { mutate: deleteCategoryItemQuery } = useMutation({
    mutationFn: (id: number) => deleteCategoryItem(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories', user] });
      toast('삭제되었습니다.');
    },
  });

  return {
    categoriesQuery,
    createCategoryQuery,
    editCategoryItemQuery,
    deleteCategoryItemQuery,
  };
}
