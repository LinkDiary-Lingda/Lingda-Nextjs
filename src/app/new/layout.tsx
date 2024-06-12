import BackHeader from '@/components/header/BackHeader';
import MainHeader from '@/components/header/MainHeader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '글 작성',
};

export default function MyPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
