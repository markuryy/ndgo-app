import { ReactElement, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { AuthLayout } from '@components/layout/auth-layout';
import { LoginFooter } from '@components/login/login-footer';
import { HeroIcon } from '@components/ui/hero-icon';
import { PreviewMain } from '@components/preview/preview-main';

export default function Onboarding(): JSX.Element {
  const router = useRouter();
  const footerLinks = [
    ['Terms of Service', 'https://ndgo.io/tos'],
    ['Privacy Policy', 'https://ndgo.io/privacy']
  ] as const;

  return (
    <>
      <main className='min-h-screen bg-black text-white overflow-hidden relative'>
        <PreviewMain />
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

Onboarding.getLayout = (page: ReactElement): ReactNode => (
  <AuthLayout>{page}</AuthLayout>
);