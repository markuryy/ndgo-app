/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect, useMemo } from 'react';
import cn from 'clsx';
import { manageRewave, manageLike } from '@lib/firebase/utils';
import { ViewWaveStats } from '@components/view/view-wave-stats';
import { WaveOption } from './wave-option';
import { WaveShare } from './wave-share';
import type { Wave } from '@lib/types/wave';

type WaveStatsProps = Pick<
  Wave,
  'userLikes' | 'userRewaves' | 'userReplies'
> & {
  reply?: boolean;
  userId: string;
  isOwner: boolean;
  waveId: string;
  viewWave?: boolean;
  openModal?: () => void;
};

export function WaveStats({
  reply,
  userId,
  isOwner,
  waveId,
  userLikes,
  viewWave,
  userRewaves,
  userReplies: totalReplies,
  openModal
}: WaveStatsProps): JSX.Element {
  const totalLikes = userLikes.length;
  const totalWaves = userRewaves.length;

  const [{ currentReplies, currentWaves, currentLikes }, setCurrentStats] =
    useState({
      currentReplies: totalReplies,
      currentLikes: totalLikes,
      currentWaves: totalWaves
    });

  useEffect(() => {
    setCurrentStats({
      currentReplies: totalReplies,
      currentLikes: totalLikes,
      currentWaves: totalWaves
    });
  }, [totalReplies, totalLikes, totalWaves]);

  const replyMove = useMemo(
    () => (totalReplies > currentReplies ? -25 : 25),
    [totalReplies]
  );

  const likeMove = useMemo(
    () => (totalLikes > currentLikes ? -25 : 25),
    [totalLikes]
  );

  const waveMove = useMemo(
    () => (totalWaves > currentWaves ? -25 : 25),
    [totalWaves]
  );

  const waveIsLiked = userLikes.includes(userId);
  const waveIsRewaveed = userRewaves.includes(userId);

  const isStatsVisible = !!(totalReplies || totalWaves || totalLikes);

  return (
    <>
      {viewWave && (
        <ViewWaveStats
          likeMove={likeMove}
          userLikes={userLikes}
          waveMove={waveMove}
          replyMove={replyMove}
          userRewaves={userRewaves}
          currentLikes={currentLikes}
          currentWaves={currentWaves}
          currentReplies={currentReplies}
          isStatsVisible={isStatsVisible}
        />
      )}
      <div
        className={cn(
          'flex text-light-secondary inner:outline-none dark:text-dark-secondary',
          viewWave ? 'justify-around py-2' : 'max-w-md justify-between'
        )}
      >
        <WaveOption
          className='hover:text-accent-indigo focus-visible:text-accent-indigo'
          iconClassName='group-hover:bg-accent-indigo/10 group-active:bg-accent-indigo/20 
                         group-focus-visible:bg-accent-indigo/10 group-focus-visible:ring-accent-indigo/80'
          tip='Reply'
          move={replyMove}
          stats={currentReplies}
          iconName='ChatBubbleOvalLeftIcon'
          viewWave={viewWave}
          onClick={openModal}
          disabled={reply}
        />
        <WaveOption
          className={cn(
            'hover:text-accent-green focus-visible:text-accent-green',
            waveIsRewaveed && 'text-accent-green [&>i>svg]:[stroke-width:2px]'
          )}
          iconClassName='group-hover:bg-accent-green/10 group-active:bg-accent-green/20
                         group-focus-visible:bg-accent-green/10 group-focus-visible:ring-accent-green/80'
          tip={waveIsRewaveed ? 'Undo Rewave' : 'Rewave'}
          move={waveMove}
          stats={currentWaves}
          iconName='ArrowPathRoundedSquareIcon'
          viewWave={viewWave}
          onClick={manageRewave(
            waveIsRewaveed ? 'unrewave' : 'rewave',
            userId,
            waveId
          )}
        />
        <WaveOption
          className={cn(
            'hover:text-accent-pink focus-visible:text-accent-pink',
            waveIsLiked && 'text-accent-pink [&>i>svg]:fill-accent-pink'
          )}
          iconClassName='group-hover:bg-accent-pink/10 group-active:bg-accent-pink/20
                         group-focus-visible:bg-accent-pink/10 group-focus-visible:ring-accent-pink/80'
          tip={waveIsLiked ? 'Unlike' : 'Like'}
          move={likeMove}
          stats={currentLikes}
          iconName='HeartIcon'
          viewWave={viewWave}
          onClick={manageLike(
            waveIsLiked ? 'unlike' : 'like',
            userId,
            waveId
          )}
        />
        <WaveShare userId={userId} waveId={waveId} viewWave={viewWave} />
        {isOwner && (
          <WaveOption
            className='hover:text-accent-indigo focus-visible:text-accent-indigo'
            iconClassName='group-hover:bg-accent-indigo/10 group-active:bg-accent-indigo/20 
                           group-focus-visible:bg-accent-indigo/10 group-focus-visible:ring-accent-indigo/80'
            tip='Analytics'
            iconName='ChartPieIcon'
            disabled
          />
        )}
      </div>
    </>
  );
}
