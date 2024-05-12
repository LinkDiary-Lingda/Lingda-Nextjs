import MainHeader from '@/components/header/MainHeader';
import type { Metadata } from 'next';
import Filters from './filters';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';

export const metadata: Metadata = {
  title: '내 링크',
};

export default function MyPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MainHeader />
      <Filters />
      <section className="mt-1 flex flex-col h-[85vh] overflow-auto scrollbar-hide">
        {children}
        <div className="sticky bottom-12 ml-auto mr-4">
          <Link
            className="w-[60px] h-[60px] rounded-full bg-Primary-02 flex items-center justify-center"
            href="/new"
          >
            <FaPlus size={40} color="white" />
          </Link>
        </div>
      </section>
    </>
  );
}
