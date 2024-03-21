import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lingda | 링크다이어리',
  description: '링크 모음 다이어리',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
