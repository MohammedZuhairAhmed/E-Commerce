import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Suspense } from 'react';
import Loading from './loading';
import Header from '@/components/header';
import data from './data.json';
import { singleEntryWithUID } from '@/contentstack-sdk/fetch';

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

  try {
    await singleEntryWithUID('header_field_1', 'blt100cbdf1c35eca05').then((res) => {
      console.log(res.navbar[0])
    });
  } catch (err) {
    console.error(err);
  }

  let headerProps: HeaderProps;
  headerProps = {
    logo: data.data.entry.logo.url,
    navigationLinks: [],
    socialmediaLinks: [],
  };

  headerProps.navigationLinks.push(...data.data.entry.navbar.link);
  headerProps.socialmediaLinks.push(...data.data.entry.social_media.link);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header params={headerProps} />
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
