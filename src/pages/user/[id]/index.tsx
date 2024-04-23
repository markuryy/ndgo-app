import { doc, query, where } from 'firebase/firestore';
import { AnimatePresence } from 'framer-motion';
import { useUser } from '@lib/context/user-context';
import { useCollection } from '@lib/hooks/useCollection';
import { useDocument } from '@lib/hooks/useDocument';
import { wavesCollection } from '@lib/firebase/collections';
import { mergeData } from '@lib/merge';
import { UserLayout, ProtectedLayout } from '@components/layout/common-layout';
import { MainLayout } from '@components/layout/main-layout';
import { UserDataLayout } from '@components/layout/user-data-layout';
import { UserHomeLayout } from '@components/layout/user-home-layout';
import { StatsEmpty } from '@components/wave/stats-empty';
import { Loading } from '@components/ui/loading';
import { Wave } from '@components/wave/wave';
import type { ReactElement, ReactNode } from 'react';

export default function UserWaves(): JSX.Element {
  const { user } = useUser();

  const { id, username, pinnedWave } = user ?? {};

  const { data: pinnedData } = useDocument(
    doc(wavesCollection, pinnedWave ?? 'null'),
    {
      disabled: !pinnedWave,
      allowNull: true,
      includeUser: true
    }
  );

  const { data: ownerWaves, loading: ownerLoading } = useCollection(
    query(
      wavesCollection,
      where('createdBy', '==', id),
      where('parent', '==', null)
    ),
    { includeUser: true, allowNull: true }
  );

  const { data: peopleWaves, loading: peopleLoading } = useCollection(
    query(
      wavesCollection,
      where('createdBy', '!=', id),
      where('userRewaves', 'array-contains', id)
    ),
    { includeUser: true, allowNull: true }
  );

  const mergedWaves = mergeData(true, ownerWaves, peopleWaves);

  return (
    <section>
      {ownerLoading || peopleLoading ? (
        <Loading className='mt-5' />
      ) : !mergedWaves ? (
        <StatsEmpty
          title={`@${username as string} hasn't waveed`}
          description='When they do, their Waves will show up here.'
        />
      ) : (
        <AnimatePresence mode='popLayout'>
          {pinnedData && (
            <Wave pinned {...pinnedData} key={`pinned-${pinnedData.id}`} />
          )}
          {mergedWaves.map((wave) => (
            <Wave {...wave} profile={user} key={wave.id} />
          ))}
        </AnimatePresence>
      )}
    </section>
  );
}

UserWaves.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedLayout>
    <MainLayout>
      <UserLayout>
        <UserDataLayout>
          <UserHomeLayout>{page}</UserHomeLayout>
        </UserDataLayout>
      </UserLayout>
    </MainLayout>
  </ProtectedLayout>
);
