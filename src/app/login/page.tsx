import Link from 'next/link';
import React from 'react';

export default async function Login() {
  return (
    <div className="flex flex-col gap-2">
      <form className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="id">아이디</label>
          <input
            placeholder="아이디"
            name="id"
            type="text"
            className="border rounded-sm p-2"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="pw">비밀번호</label>
          <input
            placeholder="비밀번호"
            name="pw"
            type="password"
            className="border rounded-sm p-2"
          />
        </div>
        <button type="submit" className="bg-blue-300 p-2 rounded-lg">
          로그인하기
        </button>
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
