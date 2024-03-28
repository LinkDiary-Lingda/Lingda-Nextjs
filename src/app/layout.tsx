import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const pretendardFont = localFont({
  src: './font/Pretendard-Regular.woff',
  variable: '--font-pretendard',
});
const gmarketFont = localFont({
  src: './font/GmarketSansTTFBold.ttf',
  variable: '--font-gmarket',
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
    <html
      lang="ko"
      className={`${pretendardFont.variable} ${gmarketFont.variable}`}
    >
      <body>
        <main className="font-pretendard">{children}</main>
      </body>
    </html>
  );
}
