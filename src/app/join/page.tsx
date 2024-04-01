'use client';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputGroup from '../../components/InputGroup';
import { checkDuplicateUser, joinMember } from '@/service/member';

export default function Join() {
  type LoginInputs = {
    username: string;
    password: string;
  };
  const [dupChecked, setDupChecked] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<LoginInputs>();
  const onSumbit: SubmitHandler<LoginInputs> = async (data) => {
    if (!dupChecked) return;
    await joinMember(data);
  };

  const handleUsernameCheck = async () => {
    const username = getValues().username;
    if (!dupChecked && username) {
      const duplicated = await checkDuplicateUser(username);
      if (!duplicated) setDupChecked(true);
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSumbit)}>
        <InputGroup
          type="text"
          placeholder="아이디"
          label="아이디"
          error={errors.username}
          register={() =>
            register('username', {
              required: { value: true, message: '아이디를 입력해주세요' },
            })
          }
        />
        <button
          className="bg-blue-600 text-white p-2 rounded-md"
          onClick={handleUsernameCheck}
        >
          중복체크
        </button>
        <InputGroup
          type="password"
          placeholder="비밀번호"
          label="비밀번호"
          error={errors.password}
          register={() =>
            register('password', {
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
