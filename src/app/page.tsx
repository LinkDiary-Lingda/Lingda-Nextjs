import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <Link href="/login" className="border px-4 py-2">
        로그인하기
      </Link>
    </main>
  );
}
