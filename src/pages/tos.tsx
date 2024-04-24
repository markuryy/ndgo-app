import { SEO } from '@components/common/seo';
import { MainContainer } from '@components/home/main-container';
import { Loading } from '@components/ui/loading';
import { AuthLayout } from '@components/layout/auth-layout';
import { markdownToHtml } from '../lib/markdownToHtml';
import type { ReactElement, ReactNode } from 'react';

export default function TermsOfService({ content }: { content: string }): JSX.Element {
  if (!content) 
    return <Loading />;

  return (
    <MainContainer>
      <SEO title='Terms of Service / ndgo' />
      <div className='prose dark:prose-dark max-w-none p-4' dangerouslySetInnerHTML={{ __html: content }} />
    </MainContainer>
  );
}

export async function getStaticProps(): Promise<{ props: { content: string } }> {
  const content = await markdownToHtml('content/terms-of-service.md');
  return {
    props: {
      content
    }
  };
}

TermsOfService.getLayout = (page: ReactElement): ReactNode => (
  <AuthLayout>
    {page}
  </AuthLayout>
);