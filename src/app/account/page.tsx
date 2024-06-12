'use client';
import BackHeader from '@/components/header/BackHeader';
import InputGroup from '@/components/InputGroup';
import InputGroupWithBtn from '@/components/InputGroupWithBtn';
import NextButton from '@/components/NextButton';
import React from 'react';
import { useForm } from 'react-hook-form';

export default function Account() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    clearErrors,
  } = useForm();
  return (
    <div className="flex flex-col w-full">
      <BackHeader title="아이디/비밀번호 찾기" />
      <div className="">
        <ul className="h-[48px] flex flex-row items-center bg-red-400">
          <li className="flex-1 border-b-2 text-center">아이디 찾기</li>
          <li className="flex-1 border-b-2 text-center">비밀번호 찾기</li>
        </ul>
      </div>
      <div className="py-4 text-Heading-3 font-pretendardBold">
        <h1>회원정보에 등록한</h1>
        <h1>휴대폰 번호를 입력해주세요.</h1>
      </div>
      <form className="py-4 flex flex-col gap-3" onSubmit={() => {}}>
        <InputGroupWithBtn
          type="text"
          placeholder="휴대폰 번호 입력"
          error={errors.username}
          register={() =>
            register('username', {
              required: { value: true, message: '아이디를 입력해주세요' },
              pattern: {
                value: /^[a-z0-9_-]{3,15}$/g,
                message: '3~15자 사이의 영문, 숫자만 가능해요.',
              },
            })
          }
          btnTitle="인증하기"
          btnOnClick={() => {}}
          btnHandled={false}
          btnHandledMsg={''}
          setBtnState={() => {}}
          clearErrors={clearErrors}
        />
        <InputGroup
          type="password"
          placeholder="인증번호 입력"
          error={errors.password}
          register={() =>
            register('password', {
              required: { value: true, message: '비밀번호를 입력해주세요' },
            })
          }
        />
        <div className="absolute bottom-8">
          <NextButton text="가입하기" errors={errors} />
        </div>
      </form>
    </div>
  );
}
