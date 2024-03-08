import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Suspense } from 'react';
import Loading from './loading';
import Header from '@/components/Header';
import { getHeaderRes } from '@/helper';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'E-Commerce Website',
  description: 'A E-Commerce Website designed and powered by Contentstack',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let dataLoaded = false;
  let headerData: HeaderProps;

  try {
    headerData = (await getHeaderRes()) as HeaderProps;
    dataLoaded = true;
  } catch (err) {
    console.error(err);
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        {dataLoaded && headerData! && <Header params={headerData} />}
        <Suspense fallback={<Loading />}>{children}</Suspense>
        <link
          rel="stylesheet"
          href="https://ui.contentstack.com/contentstack.min.css"
        />
        <script
          src="https://ui.contentstack.com/bootstrap.min.js"
          crossOrigin="anonymous"
          async
        ></script>
        <script
          src="https://ui.contentstack.com/contentstack.min.js"
          async
        ></script>
      </body>
    </html>
  );
}
