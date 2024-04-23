import Link from 'next/link';
import cn from 'clsx';
import { formatDate } from '@lib/date';
import { ToolTip } from '@components/ui/tooltip';
import type { Wave } from '@lib/types/wave';

type WaveDateProps = Pick<Wave, 'createdAt'> & {
  waveLink: string;
  viewWave?: boolean;
};

export function WaveDate({
  createdAt,
  waveLink,
  viewWave
}: WaveDateProps): JSX.Element {
  return (
    <div className={cn('flex gap-1', viewWave && 'py-4')}>
      {!viewWave && <i>·</i>}
      <div className='group relative'>
        <Link href={waveLink}>
          <a
            className={cn(
              'custom-underline peer whitespace-nowrap',
              viewWave && 'text-light-secondary dark:text-dark-secondary'
            )}
          >
            {formatDate(createdAt, viewWave ? 'full' : 'wave')}
          </a>
        </Link>
        <ToolTip
          className='translate-y-1 peer-focus:opacity-100 peer-focus-visible:visible
                     peer-focus-visible:delay-200'
          tip={formatDate(createdAt, 'full')}
        />
      </div>
    </div>
  );
}
