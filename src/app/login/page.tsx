import Link from 'next/link';
import React from 'react';
import LoginForm from './LoginForm';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Login() {
  const session = await getServerSession();
  if (session) {
    return redirect('/');
  }
  return (
    <div className="h-full w-full flex flex-col justify-between">
      <section>
        <div className="mt-[3.75rem]">
          <h1 className="text-Primary-03 text-[26px] leading-9 font-gmarketBold">
            Lingda
          </h1>
          <p className="text-Heading-3 font-pretendardBold mt-1 text-On-Surface-Primary">
            내 손안의 링크다이어리
          </p>
        </div>
        <div className="flex justify-center">
          <LoginForm />
        </div>
        <div className="flex justify-center mt-4">
          <ul className="w-[203px] flex flex-row items-center justify-between text-On-Surface-Third text-Body-2 leading-Body-2">
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
      <section className="w-full flex flex-row justify-center items-center gap-[10px] text-Body-2 mb-12">
        <span className="text-On-Surface-Secondary">아이디가 없나요?</span>
        <Link
          href="/join"
          className="text-On-Primary-Container font-pretendardBold underline underline-offset-4"
        >
          가입하기
        </Link>
      </section>
    </div>
  );
}
