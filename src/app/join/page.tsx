'use client';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputGroup from '../../components/InputGroup';
import { checkDuplicateUser, joinMember } from '@/service/member';
import BackHeader from '@/components/header/BackHeader';
import InputGroupWithBtn from '@/components/InputGroupWithBtn';
import NextButton from '@/components/NextButton';
import { useRouter } from 'next/navigation';

export default function Join() {
  type LoginInputs = {
    username: string;
    password: string;
    passwordConfirm: string;
  };
  const [dupChecked, setDupChecked] = useState(false);
  const [dupCheckedMsg, setDupCheckedMsg] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    clearErrors,
  } = useForm<LoginInputs>();

  const router = useRouter();

  const onSumbit: SubmitHandler<LoginInputs> = async ({
    username,
    password,
  }) => {
    if (!dupChecked) {
      return setError('username', { message: '아이디 중복 확인이 필요해요.' });
    }
    await joinMember({ username, password });
    router.push('/my');
  };

  const handleUsernameCheck = async () => {
    const username = getValues().username;
    if (!dupChecked && username) {
      const duplicated = await checkDuplicateUser(username);
      if (duplicated === false) {
        setDupChecked(true);
        setDupCheckedMsg('사용가능한 아이디예요.');
        return clearErrors('username');
      }
      setError('username', {
        message: '이미 존재하는 아이디예요. 다시 입력해주세요.',
      });
      setDupCheckedMsg('');
    }
  };

  return (
    <section className="w-full h-full flex flex-col items-center">
      <div className="w-full h-full flex flex-col">
        <BackHeader title="가입하기" />
        <div className="pt-6 pb-12 text-Heading-3 leading-Heading-3 font-pretendardBold text-On-Surface-Primary">
          <h1>아래 정보로</h1>
          <h1>가입을 진행합니다.</h1>
        </div>
        <form
          className="py-4 flex flex-grow flex-col gap-3 justify-between"
          onSubmit={handleSubmit(onSumbit)}
        >
          <div className="flex flex-col gap-5">
            <InputGroupWithBtn
              type="text"
              placeholder="아이디 입력"
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
              btnTitle="중복확인"
              btnOnClick={handleUsernameCheck}
              btnHandled={dupChecked}
              btnHandledMsg={dupCheckedMsg}
              setBtnState={setDupChecked}
              clearErrors={() => clearErrors('username')}
            />
            <InputGroup
              type="password"
              placeholder="비밀번호 입력"
              error={errors.password}
              register={() =>
                register('password', {
                  required: { value: true, message: '비밀번호를 입력해주세요' },
                })
              }
              clearErrors={() => clearErrors('password')}
            />
            <InputGroup
              type="password"
              placeholder="비밀번호 재입력"
              error={errors.passwordConfirm}
              register={() =>
                register('passwordConfirm', {
                  required: {
                    value: true,
                    message: '비밀번호를 입력해주세요.',
                  },
                  validate: (value) =>
                    value === getValues().password ||
                    '비밀번호가 일치하지 않습니다.',
                })
              }
              clearErrors={() => clearErrors('passwordConfirm')}
            />
            {errors.password && (
              <small className="text-Error -my-4">
                {errors.password.message}
              </small>
            )}
            {errors.passwordConfirm && (
              <small className="text-Error -my-4">
                {errors.passwordConfirm.message}
              </small>
            )}
          </div>
          <div className="mb-6">
            <NextButton text="가입하기" errors={errors} />
          </div>
        </form>
      </div>
    </section>
  );
}
