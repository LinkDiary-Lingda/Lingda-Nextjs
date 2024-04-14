import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'Gray-01': '#FAFAFA',
        'Gray-02': '#F5F5F5',
        'Gray-03': '#EEEEEE',
        'Gray-04': '#E0E0E0',
        'Gray-05': '#BDBDBD',
        'Gray-06': '#9E9E9E',
        'Gray-07': '#757575',
        'Gray-08': '#616161',
        'Gray-09': '#424242',
        'Gray-10': '#212121',
        'Blue-01': '#E3EEFF',
        'Blue-02': '#1F74F5',
        'Red-01': '#FDE3E3',
        'Red-02': '#F04242',
        'Primary-01': '#D3F8EF',
        'Primary-02': '#57E5C3',
        'Primary-03': '#2BDEB3',
        'Primary-04': '#1DB994',
        'Sub-01': '#F7F7EF',
        Naver: '#27D34A',
        Kakao: '#FFEB00',
      },
      fontSize: {
        'Heading-1': '34px',
        'Heading-2': '28px',
        'Heading-3': '21px',
        'Heading-4': '18px',
        'Body-1': '16px',
        'Body-2': '14px',
        'Detail-1': '12px',
      },
      lineHeight: {
        'Heading-1': '44px',
        'Heading-2': '37px',
        'Heading-3': '29px',
        'Heading-4': '25px',
        'Body-1': '24px',
        'Body-2': '22px',
        'Detail-1': '18px',
      },
      fontFamily: {
        pretendardBold: ['var(--font-pretendard-bold)'],
        pretendardRegular: ['var(--font-pretendard-regular)'],
        gmarketBold: ['var(--font-gmarket-bold)'],
        gmarketMedium: ['var(--font-gmarket-medium)'],
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
export default config;
