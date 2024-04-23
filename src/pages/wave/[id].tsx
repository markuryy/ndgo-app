import { useRef } from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import { doc, query, where, orderBy } from 'firebase/firestore';
import { wavesCollection } from '@lib/firebase/collections';
import { useCollection } from '@lib/hooks/useCollection';
import { useDocument } from '@lib/hooks/useDocument';
import { isPlural } from '@lib/utils';
import { HomeLayout, ProtectedLayout } from '@components/layout/common-layout';
import { MainLayout } from '@components/layout/main-layout';
import { MainContainer } from '@components/home/main-container';
import { MainHeader } from '@components/home/main-header';
import { Wave } from '@components/wave/wave';
import { ViewWave } from '@components/view/view-wave';
import { SEO } from '@components/common/seo';
import { Loading } from '@components/ui/loading';
import { Error } from '@components/ui/error';
import { ViewParentWave } from '@components/view/view-parent-wave';
import type { ReactElement, ReactNode } from 'react';

export default function WaveId(): JSX.Element {
  const {
    query: { id },
    back
  } = useRouter();

  const { data: waveData, loading: waveLoading } = useDocument(
    doc(wavesCollection, id as string),
    { includeUser: true, allowNull: true }
  );

  const viewWaveRef = useRef<HTMLElement>(null);

  const { data: repliesData, loading: repliesLoading } = useCollection(
    query(
      wavesCollection,
      where('parent.id', '==', id),
      orderBy('createdAt', 'desc')
    ),
    { includeUser: true, allowNull: true }
  );

  const { text, images } = waveData ?? {};

  const imagesLength = images?.length ?? 0;
  const parentId = waveData?.parent?.id;

  const pageTitle = waveData
    ? `${waveData.user.name} on ndgo: "${text ?? ''}${
        images ? ` (${imagesLength} image${isPlural(imagesLength)})` : ''
      }" / ndgo`
    : null;

  return (
    <MainContainer className='!pb-[1280px]'>
      <MainHeader
        useActionButton
        title={parentId ? 'Thread' : 'Wave'}
        action={back}
      />
      <section>
        {waveLoading ? (
          <Loading className='mt-5' />
        ) : !waveData ? (
          <>
            <SEO title='Wave not fount / ndgo' />
            <Error message='Wave not found' />
          </>
        ) : (
          <>
            {pageTitle && <SEO title={pageTitle} />}
            {parentId && (
              <ViewParentWave
                parentId={parentId}
                viewWaveRef={viewWaveRef}
              />
            )}
            <ViewWave viewWaveRef={viewWaveRef} {...waveData} />
            {waveData &&
              (repliesLoading ? (
                <Loading className='mt-5' />
              ) : (
                <AnimatePresence mode='popLayout'>
                  {repliesData?.map((wave) => (
                    <Wave {...wave} key={wave.id} />
                  ))}
                </AnimatePresence>
              ))}
          </>
        )}
      </section>
    </MainContainer>
  );
}

WaveId.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedLayout>
    <MainLayout>
      <HomeLayout>{page}</HomeLayout>
    </MainLayout>
  </ProtectedLayout>
);
