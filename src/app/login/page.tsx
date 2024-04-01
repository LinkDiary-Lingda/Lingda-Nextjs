'use client';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { LoginInputs } from '../../types/member';
import InputGroup from '../../components/InputGroup';
import NextButton from '@/components/NextButton';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<LoginInputs>();

  const handleLoginBtn = () => {};

  return (
    <div className="flex flex-col gap-2">
      <div className="mt-20">
        <h1 className="text-Primary-03 text-Heading-2 font-gmarketBold">
          Lingda
        </h1>
        <p className="text-Heading-3 font-pretendardBold mt-1">
          내 손안의 링크다이어리
        </p>
      </div>
      <form
        className="flex flex-col gap-5 mt-10"
        onSubmit={handleSubmit(handleLoginBtn)}
      >
        <InputGroup
          type="text"
          placeholder="아이디"
          error={errors.username}
          register={() =>
            register('username', {
              required: { value: true, message: '아이디를 입력해주세요' },
            })
          }
          onDelete={() => setValue('username', '')}
        />
        <InputGroup
          type="password"
          placeholder="비밀번호"
          error={errors.password}
          register={() =>
            register('password', {
              required: { value: true, message: '비밀번호를 입력해주세요' },
            })
          }
          onDelete={() => setValue('password', '')}
        />
        <NextButton text="로그인하기" errors={errors} />
      </form>
      <Link
        href="join"
        type="button"
        className="bg-gray-300 p-2 rounded-lg text-center"
      >
        회원가입하기
      </Link>
    </div>
  );
}
