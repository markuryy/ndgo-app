import Head from 'next/head';

export function AppHead(): JSX.Element {
  return (
    <Head>
      <title>ndgo</title>
      <meta name='og:title' content='ndgo' />
      <link rel='icon' href='/favicon.ico' />
      <link rel='manifest' href='/site.webmanifest' key='site-manifest' />
      <meta name='twitter:site' content='@markury' />
      <meta name='twitter:card' content='summary_large_image' />
    </Head>
  );
}
