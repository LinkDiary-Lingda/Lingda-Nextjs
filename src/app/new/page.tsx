'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import LinkInput from './LinkInput';

export default function New() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    clearErrors,
  } = useForm();
  return (
    <div className="flex flex-col items-center mt-4">
      <input
        {...register('title', {
          required: {
            value: true,
            message: '글 제목을 입력해주세요.',
          },
        })}
        placeholder="글 제목을 입력하세요."
        className="w-[312px] h-[55px] border-b-2 outline-none text-Body-1"
      />
      <LinkInput />
    </div>
  );
}
