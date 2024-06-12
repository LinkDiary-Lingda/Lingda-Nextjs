import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import OverlayProvider from '@/components/modal/OverlayProvider';
import { NextAuthProvider } from '@/context/NextAuthProvider';
import { Flip, ToastContainer } from 'react-toastify';
import ReactQueryClientProvider from '@/hooks/ReactQueryClientProvider';
import RecoilWrapper from '@/context/RecoilWrapper';
import UseLoading from '@/hooks/handlers/useLoading';

const pretendardBoldFont = localFont({
  src: './styles/font/Pretendard-Bold.woff',
  variable: '--font-pretendard-bold',
  display: 'swap',
});
const pretendardRegularFont = localFont({
  src: './styles/font/Pretendard-Regular.woff',
  variable: '--font-pretendard-regular',
  display: 'swap',
});
const gmarketBoldFont = localFont({
  src: './styles/font/GmarketSansTTFBold.ttf',
  variable: '--font-gmarket-bold',
  display: 'swap',
});
const gmarketMediumFont = localFont({
  src: './styles/font/GmarketSansTTFMedium.ttf',
  variable: '--font-gmarket-medium',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Lingda',
    default: '링크 다이어리 | Lingda',
  },
  description: '간편하게 링크와 메모, 북마크를 관리해보세요!',
  authors: [{ name: 'Lingda Team' }],
  icons: { icon: './icon.ico' },
  openGraph: {
    type: 'website',
    url: 'https://lingda.app',
    title: '링크 다이어리 | Lingda',
    description: '간편하게 링크와 메모, 북마크를 관리해보세요!',
    images: [{ url: 'https://lingda.app/lingda-og-image.png' }],
    locale: 'ko_KR',
  },
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
      <head></head>
      <body>
        <ReactQueryClientProvider>
          <OverlayProvider>
            <NextAuthProvider>
              <RecoilWrapper>
                <UseLoading>
                  <main>{children}</main>
                </UseLoading>
              </RecoilWrapper>
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
