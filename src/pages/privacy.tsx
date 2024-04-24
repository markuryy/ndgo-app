import { SEO } from '@components/common/seo';
import { MainContainer } from '@components/home/main-container';
import { Loading } from '@components/ui/loading';
import { AuthLayout } from '@components/layout/auth-layout';
import { markdownToHtml } from '../lib/markdownToHtml';
import type { ReactElement, ReactNode } from 'react';

export default function PrivacyPolicy({ content }: { content: string }): JSX.Element {
  if (!content) 
    return <Loading />;

  return (
    <MainContainer>
      <SEO title='Privacy Policy / ndgo' />
      <div className='prose dark:prose-dark max-w-none p-4' dangerouslySetInnerHTML={{ __html: content }} />
    </MainContainer>
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

PrivacyPolicy.getLayout = (page: ReactElement): ReactNode => (
  <AuthLayout>
    {page}
  </AuthLayout>
);