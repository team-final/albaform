import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';

import RootHeader from '../components/RootHeader/RootHeader';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'albaform - 한 곳에서 관리하는 알바 구인 플랫폼',
  description: '한 곳에서 관리하는 알바 구인 플랫폼',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <RootHeader />
        {children}
      </body>
    </html>
  );
}
