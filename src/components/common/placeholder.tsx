import { CustomIcon } from '@components/ui/custom-icon';
import { SEO } from './seo';

export function Placeholder(): JSX.Element {
  return (
    <main className='flex min-h-screen items-center justify-center'>
      <SEO
        title='ndgo'
        description='The world is changing.'
        image='/home.png'
      />
      <i>
        <CustomIcon
          className='h-20 w-20 text-[#4B369D]'
          iconName='TwitterIcon'
        />
      </i>
    </main>
  );
}
