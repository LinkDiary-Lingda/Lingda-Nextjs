'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { LoginInputs } from '../../types/member';
import InputGroup from '../../components/InputGroup';
import NextButton from '@/components/NextButton';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<LoginInputs>();
  const router = useRouter();

  const handleLoginBtn = async ({ username, password }: LoginInputs) => {
    const result = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });
    if (result) {
      if (result.ok) {
        router.push('/my');
      } else {
        setError('username', {
          message: '아이디 또는 비밀번호가 일치하지 않습니다.',
        });
        setError('password', {
          message: '아이디 또는 비밀번호가 일치하지 않습니다.',
        });
      }
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
        clearErrors={clearErrors}
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
        clearErrors={clearErrors}
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
      <div className="mt-12 w-full">
        <NextButton text="로그인하기" errors={errors} />
      </div>
    </form>
  );
}
