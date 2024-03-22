'use client';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputGroup from './InputGroup';

export default function Join() {
  type LoginInputs = {
    id: string;
    pw: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();
  const onSumbit: SubmitHandler<LoginInputs> = (data) => console.log(data);

  return (
    <div className="flex flex-col gap-2">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSumbit)}>
        <InputGroup
          type="text"
          name="id"
          placeholder="아이디"
          label="아이디"
          error={errors.id}
          register={() =>
            register('id', {
              required: { value: true, message: '아이디를 입력해주세요' },
            })
          }
        />
        <InputGroup
          type="password"
          name="pw"
          placeholder="비밀번호"
          label="비밀번호"
          error={errors.pw}
          register={() =>
            register('pw', {
              required: { value: true, message: '비밀번호를 입력해주세요' },
            })
          }
        />
        <button type="submit" className="bg-blue-300 p-2 rounded-lg">
          회원가입하기
        </button>
      </form>
    </div>
  );
}
