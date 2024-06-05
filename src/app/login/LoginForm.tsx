'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoginInputs } from '../../types/member';
import InputGroup from '../../components/InputGroup';
import NextButton from '@/components/NextButton';
import { signIn } from 'next-auth/react';

export default function LoginForm() {
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const handleLoginBtn = async ({ username, password }: LoginInputs) => {
    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: true,
        callbackUrl: '/my',
      });
    } catch (error) {
      if (error === '401')
        setError('아이디 또는 비밀번호가 일치하지 않습니다.');
      return;
    }
  };
  return (
    <form
      className="w-full flex flex-col gap-5 mt-10"
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
      />
      {errors.password && !errors.username && (
        <small className="text-Error -my-4 ml-2">
          {errors.password.message}
        </small>
      )}
      {!errors.password && errors.username && (
        <small className="text-Error -my-4 ml-2">
          {errors.username.message}
        </small>
      )}
      {errors.password && errors.username && (
        <small className="text-Error -my-4 ml-2">
          아이디 또는 비밀번호가 일치하지 않습니다.
        </small>
      )}
      {error && <small className="text-Error -mt-y ml-2">{error}</small>}
      <div className="mt-12 w-full">
        <NextButton text="로그인하기" errors={errors} />
      </div>
    </form>
  );
}
