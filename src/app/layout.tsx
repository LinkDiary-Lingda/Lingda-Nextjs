import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const pretendardFont = localFont({
  src: './font/Pretendard-Regular.woff',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Lingda',
    default: '링크 다이어리 | Lingda',
  },
  description: '간편하게 링크와 메모, 북마크를 관리해보세요!',
  icons: { icon: './icon.ico' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendardFont.className}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
