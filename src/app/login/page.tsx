import Link from 'next/link';
import React from 'react';
import LoginForm from './LoginForm';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Loading from '../loading';

export default async function Login() {
  const session = await getServerSession();
  if (session) {
    return redirect('/');
  }
  return (
    <div className="flex flex-col justify-between items-center">
      <Loading />
      <section>
        <div className="mt-20">
          <h1 className="text-Primary-03 text-Heading-2 font-gmarketBold">
            Lingda
          </h1>
          <p className="text-Heading-3 font-pretendardBold mt-1">
            내 손안의 링크다이어리
          </p>
        </div>
        <LoginForm />
        <div className="flex justify-center mt-4">
          <ul className="w-[200px] flex flex-row items-center justify-between text-Gray-06 text-Body-2 leading-Body-2">
            <li>
              <Link href="/account">아이디 찾기</Link>
            </li>
            <li>
              <span>|</span>
            </li>
            <li>
              <Link href="/account">비밀번호 찾기</Link>
            </li>
          </ul>
        </div>
      </section>
      <section className="flex flex-row justify-center gap-2 text-Body-2 absolute bottom-8">
        <span className="text-Gray-06">아이디가 없나요?</span>
        <Link href="/join" className="text-Primary-04 underline">
          가입하기
        </Link>
      </section>
    </div>
  );
}
