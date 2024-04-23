import Link from 'next/link';
import cn from 'clsx';
import { motion } from 'framer-motion';
import type { MotionProps } from 'framer-motion';
import { FaBug, FaEnvelope } from 'react-icons/fa';

export const animationVariants: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8 }
};

type AsideTrendsProps = {
  inTrendsPage?: boolean;
};

export function AsideTrends({ inTrendsPage }: AsideTrendsProps): JSX.Element {
  return (
    <section
      className={cn(
        'transition-all duration-300 ease-in-out',
        !inTrendsPage && 'rounded-2xl bg-main-sidebar-background'
      )}
    >
      <motion.div
        className={cn('p-4', inTrendsPage ? 'mt-0.5' : 'mt-0')}
        {...animationVariants}
      >
        {!inTrendsPage && (
          <h2 className='text-xl font-bold text-primary-dark'>ndgo is in beta</h2>
        )}
        <div className='flex items-center gap-2 my-2'>
          <FaBug className='text-lg text-warning' />
          <p className='text-sm font-medium text-light-secondary dark:text-dark-secondary'>
            Look out for bugs
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <FaEnvelope className='text-lg text-primary' />
          <p className='text-sm font-medium text-light-secondary dark:text-dark-secondary'>
            Found a bug? <Link href="mailto:help@ndgo.io"><a className='text-primary underline'>Let us know</a></Link>
          </p>
        </div>
      </motion.div>
    </section>
  );
}

