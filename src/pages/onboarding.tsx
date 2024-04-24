import { ReactElement, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { AuthLayout } from '@components/layout/auth-layout';
import { SEO } from '@components/common/seo';
import { LoginFooter } from '@components/login/login-footer';
import { HeroIcon } from '@components/ui/hero-icon';
import { Button } from '@components/ui/button';

export default function Onboarding(): JSX.Element {
  const router = useRouter();

  return (
    <>
      <SEO title="Onboarding / ndgo" />
      <main className="min-h-screen bg-black text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-dots opacity-10"></div>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-8 lg:text-6xl">Welcome to ndgo</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="border border-white rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Express Yourself</h2>
              <p className="text-base">ndgo is a platform where you can express yourself, share your thoughts, and connect with like-minded individuals who appreciate unique and thought-provoking content in the AI era.</p>
            </div>
            <div className="border border-white rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Waves</h2>
              <p className="text-base">On ndgo, posts are called "waves," just like how everything in the universe, from light to sound to Wi-Fi, is made up of waves. We believe in the power of these waves to carry your ideas and emotions.</p>
            </div>
            <div className="border border-white rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Three Waves of Children</h2>
              <p className="text-base">Our community is inspired by the concept of the three waves of children: Indigo, Crystalline, and Rainbow. These waves represent the evolution of human consciousness and possess unique characteristics and abilities.</p>
            </div>
            <div className="border border-white rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Unique Content</h2>
              <p className="text-base">ndgo is a space for those who feel their content doesn't quite fit on mainstream platforms. If you want your voice to be heard by people who genuinely care about what you have to say, this is the place for you.</p>
            </div>
            <div className="border border-white rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Sensitive Content</h2>
              <p className="text-base">When creating a wave with sensitive images, simply mark it with the eye icon <HeroIcon className="inline-block w-5 h-5" iconName="EyeSlashIcon" /> so it's blurred by default. You won't see anything sensitive until you click on a post.</p>
            </div>
            <div className="border border-white rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Pronunciation</h2>
              <p className="text-base">ndgo is pronounced as "indigo" - a color that represents intuition, creativity, and deep understanding.</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-base mb-4">We are a small community, still in beta, and we value quality over quantity. It's about expressing yourself authentically and connecting with others who appreciate your unique perspective.</p>
            <Button
              className="mt-8 bg-accent-indigo text-white px-6 py-3 rounded-full text-lg font-semibold 
                         hover:bg-accent-indigo/90 focus:outline-none focus:ring-2 focus:ring-offset-2 
                         focus:ring-accent-indigo transition duration-150 ease-in-out"
              onClick={() => router.push('/')}
            >
              join ndgo
            </Button>
          </div>
        </div>
        <LoginFooter />
      </main>
    </>
  );
}

Onboarding.getLayout = (page: ReactElement): ReactNode => (
  <AuthLayout>{page}</AuthLayout>
);