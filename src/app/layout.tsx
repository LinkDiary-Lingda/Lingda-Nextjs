import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import OverlayProvider from '@/components/modal/OverlayProvider';
import { NextAuthProvider } from '@/context/NextAuthProvider';
import { Flip, ToastContainer } from 'react-toastify';
import ReactQueryClientProvider from '@/hooks/ReactQueryClientProvider';
import { CategoryContextProvider } from '@/context/CategoryContext';

const pretendardBoldFont = localFont({
  src: './font/Pretendard-Bold.woff',
  variable: '--font-pretendard-bold',
  display: 'swap',
});
const pretendardRegularFont = localFont({
  src: './font/Pretendard-Regular.woff',
  variable: '--font-pretendard-regular',
  display: 'swap',
});
const gmarketBoldFont = localFont({
  src: './font/GmarketSansTTFBold.ttf',
  variable: '--font-gmarket-bold',
  display: 'swap',
});
const gmarketMediumFont = localFont({
  src: './font/GmarketSansTTFMedium.ttf',
  variable: '--font-gmarket-medium',
  display: 'swap',
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
              <CategoryContextProvider>
                <main className="font-pretendardRegular">{children}</main>
              </CategoryContextProvider>
            </NextAuthProvider>
          </OverlayProvider>
          <ToastContainer
            position="bottom-center"
            autoClose={1500}
            hideProgressBar={true}
            closeOnClick
            theme="dark"
            transition={Flip}
          />
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
