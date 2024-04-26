import { ReactElement, ReactNode } from 'react';
import { AuthLayout } from '@components/layout/auth-layout';
import { SEO } from '@components/common/seo';
import { markdownToHtml } from '../lib/markdownToHtml';
import { Loading } from '@components/ui/loading';
import { NextImage } from '@components/ui/next-image';
import { CustomIcon } from '@components/ui/custom-icon';

export default function Privacy({ content }: { content: string }): JSX.Element {
  const footerLinks = [
    ['Terms of Service', 'https://ndgo.io/tos'],
    ['Privacy Policy', 'https://ndgo.io/privacy']
  ] as const;

  if (!content)
    return <Loading />;

  return (
    <>
      <SEO title='Privacy Policy / ndgo' />
      <main className='lg:grid lg:grid-cols-[1fr,1fr] lg:min-h-screen'>
        <div className='relative hidden lg:block'>
          <div className='fixed top-0 left-0 h-screen w-1/2'>
            <NextImage
              imgClassName='object-cover'
              blurClassName='bg-accent-indigo'
              src='/assets/ndgo-banner.png'
              alt='ndgo banner'
              layout='fill'
              useSkeleton
            />
            <i className='absolute inset-0 flex items-center justify-center'>
              <CustomIcon className='h-96 w-96 text-white' iconName='TwitterIcon' />
            </i>
          </div>
        </div>
        <div className='flex flex-col items-center justify-between gap-6 p-8 lg:items-start lg:justify-center lg:overflow-y-auto'>
          <div className='prose dark:prose-dark max-w-none' dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </main>
      <footer className='hidden lg:block'>
        <div className='container mx-auto'>
          <div className='flex justify-end p-4 text-sm text-light-secondary dark:text-dark-secondary'>
            <nav className='flex flex-wrap gap-4 gap-y-2'>
              {footerLinks.map(([linkName, href]) => (
                <a
                  className='custom-underline'
                  target='_blank'
                  rel='noreferrer'
                  href={href}
                  key={linkName}
                >
                  {linkName}
                </a>
              ))}
              <p>© 2024 Markury</p>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}

export async function getStaticProps(): Promise<{ props: { content: string } }> {
  const content = await markdownToHtml('content/privacy-policy.md');
  return {
    props: {
      content
    }
  };
}

Privacy.getLayout = (page: ReactElement): ReactNode => (
  <AuthLayout>{page}</AuthLayout>
);