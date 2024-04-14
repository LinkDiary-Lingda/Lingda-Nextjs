import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '내 링크',
};

export default function MyPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
