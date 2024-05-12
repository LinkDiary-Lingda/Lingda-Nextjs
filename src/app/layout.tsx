import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import OverlayProvider from '@/components/modal/OverlayProvider';
import { NextAuthProvider } from '@/context/NextAuthProvider';
import { ToastContainer } from 'react-toastify';
import ReactQueryClientProvider from '@/hooks/ReactQueryClientProvider';

const pretendardBoldFont = localFont({
  src: './font/Pretendard-Bold.woff',
  variable: '--font-pretendard-bold',
});
const pretendardRegularFont = localFont({
  src: './font/Pretendard-Regular.woff',
  variable: '--font-pretendard-regular',
});
const gmarketBoldFont = localFont({
  src: './font/GmarketSansTTFBold.ttf',
  variable: '--font-gmarket-bold',
});
const gmarketMediumFont = localFont({
  src: './font/GmarketSansTTFMedium.ttf',
  variable: '--font-gmarket-medium',
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
      className={`${pretendardBoldFont.variable} ${pretendardRegularFont.variable} ${gmarketBoldFont.variable} ${gmarketMediumFont.variable}`}
    >
      <body>
        <ReactQueryClientProvider>
          <OverlayProvider>
            <NextAuthProvider>
              <main className="font-pretendardRegular">{children}</main>
            </NextAuthProvider>
          </OverlayProvider>
          <ToastContainer />
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
