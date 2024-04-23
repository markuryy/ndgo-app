import { MainHeader } from '@components/home/main-header';
import type { ReactNode } from 'react';
import type { StatsType } from '@components/view/view-wave-stats';

type WaveStatsModalProps = {
  children: ReactNode;
  statsType: StatsType | null;
  handleClose: () => void;
};

export function WaveStatsModal({
  children,
  statsType,
  handleClose
}: WaveStatsModalProps): JSX.Element {
  return (
    <>
      <MainHeader
        useActionButton
        disableSticky
        tip='Close'
        iconName='XMarkIcon'
        className='absolute flex w-full items-center gap-6 rounded-tl-2xl'
        title={`${statsType === 'likes' ? 'Liked' : 'Rewaveed'} by`}
        action={handleClose}
      />
      {children}
    </>
  );
}
