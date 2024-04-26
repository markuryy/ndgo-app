import { NextImage } from '@components/ui/next-image';
import { CustomIcon } from '@components/ui/custom-icon';
import { AnimatePresence } from 'framer-motion';
import { useInfiniteScroll } from '@lib/hooks/useInfiniteScroll';
import { wavesCollection } from '@lib/firebase/collections';
import { where, orderBy } from 'firebase/firestore';
import { WaveLite } from '@components/wave/wave-lite';
import { Loading } from '@components/ui/loading';
import { Error } from '@components/ui/error';
import { WindowContextProvider } from '@lib/context/window-context';
import { useRouter } from 'next/router';

export function PreviewMain(): JSX.Element {
  const { data, loading, LoadMore } = useInfiniteScroll(
    wavesCollection,
    [where('parent', '==', null), orderBy('createdAt', 'desc')],
    { includeUser: true, allowNull: true, preserve: true }
  );

  const router = useRouter();

  return (
    <WindowContextProvider>
      <main className='lg:grid lg:min-h-screen lg:grid-cols-[1fr,1fr]'>
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
              <CustomIcon
                className='h-96 w-96 text-white'
                iconName='TwitterIcon'
              />
            </i>
          </div>
        </div>
        <div className='flex flex-col items-center justify-between gap-6 p-8 lg:items-start lg:justify-center lg:overflow-y-auto'>
          <i className='mb-0 self-center lg:mb-10 lg:self-auto'>
            <CustomIcon
              className='-mt-4 h-6 w-6 text-accent-indigo lg:h-12 lg:w-12 dark:lg:text-twitter-icon'
              iconName='TwitterIcon'
            />
          </i>
          <div className='flex max-w-xs flex-col gap-4 font-twitter-chirp-extended lg:max-w-none lg:gap-16'>
            <h1
              className='text-3xl before:content-["See_what&apos;s_happening_in_the_world_of_AI."] 
                         lg:text-6xl lg:before:content-["A_little_more_indigo"]'
            />
            <h2 className='hidden text-xl lg:block lg:text-3xl'>
              Get a taste of ndgo.
            </h2>
            <section className='font-twitter-chirp xs:mt-0'>
              {loading ? (
                <Loading className='mt-5' />
              ) : !data ? (
                <Error message='Something went wrong' />
              ) : (
                <>
                  <AnimatePresence mode='popLayout'>
                    {data.slice(0, 3).map((wave) => (
                      <WaveLite {...wave} key={wave.id} />
                    ))}
                  </AnimatePresence>
                  <LoadMore />
                  <div className='mt-10 text-center'>
                    <h3 className='text-2xl font-bold'>Ready to dive in? Join the ndgo beta today</h3>
                    <button
                      className='mt-4 rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600'
                      onClick={() => router.push('/')}
                    >
                      Sign up
                    </button>
                  </div>
                </>
              )}
            </section>
          </div>
        </div>
      </main>
    </WindowContextProvider>
  );
}
