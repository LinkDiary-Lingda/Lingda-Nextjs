import MainHeader from '@/components/header/MainHeader';
import type { Metadata } from 'next';
import Filters from './components/filters';
import Link from 'next/link';
import addPlus from '../../images/add-plus.png';
import Image from 'next/image';

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
      <section className="flex flex-col h-[85vh] overflow-auto scrollbar-hide">
        {children}
      </section>
      <div className="sticky bottom-12 ml-auto mr-4">
        <Link
          className="w-[60px] h-[60px] rounded-full bg-Primary flex items-center justify-center shadow-lg"
          href="/new"
        >
          <Image
            src={addPlus}
            width={28}
            height={28}
            alt="create-topic-button"
          />
        </Link>
      </div>
    </>
  );
}
