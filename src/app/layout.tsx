import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="ko">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
