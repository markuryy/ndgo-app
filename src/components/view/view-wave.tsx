import Link from 'next/link';
import { motion } from 'framer-motion';
import cn from 'clsx';
import { useAuth } from '@lib/context/auth-context';
import { useModal } from '@lib/hooks/useModal';
import { Modal } from '@components/modal/modal';
import { WaveReplyModal } from '@components/modal/wave-reply-modal';
import { ImagePreview } from '@components/input/image-preview';
import { UserAvatar } from '@components/user/user-avatar';
import { UserTooltip } from '@components/user/user-tooltip';
import { UserName } from '@components/user/user-name';
import { UserUsername } from '@components/user/user-username';
import { variants } from '@components/wave/wave';
import { WaveActions } from '@components/wave/wave-actions';
import { WaveStats } from '@components/wave/wave-stats';
import { WaveDate } from '@components/wave/wave-date';
import { Input } from '@components/input/input';
import type { RefObject } from 'react';
import type { User } from '@lib/types/user';
import type { Wave } from '@lib/types/wave';

type ViewWaveProps = Wave & {
  user: User;
  viewWaveRef?: RefObject<HTMLElement>;
};

export function ViewWave(wave: ViewWaveProps): JSX.Element {
  const {
    id: waveId,
    text,
    images,
    parent,
    userLikes,
    createdBy,
    createdAt,
    userRewaves,
    userReplies,
    viewWaveRef,
    user: waveUserData
  } = wave;

  const { id: ownerId, name, username, verified, photoURL } = waveUserData;

  const { user } = useAuth();

  const { open, openModal, closeModal } = useModal();

  const waveLink = `/wave/${waveId}`;

  const userId = user?.id as string;

  const isOwner = userId === createdBy;

  const reply = !!parent;

  const { id: parentId, username: parentUsername = username } = parent ?? {};

  return (
    <motion.article
      className={cn(
        `accent-tab h- relative flex cursor-default flex-col gap-3 border-b
         border-light-border px-4 py-3 outline-none dark:border-dark-border`,
        reply && 'scroll-m-[3.25rem] pt-0'
      )}
      {...variants}
      animate={{ ...variants.animate, transition: { duration: 0.2 } }}
      exit={undefined}
      ref={viewWaveRef}
    >
      <Modal
        className='flex items-start justify-center'
        modalClassName='bg-main-background rounded-2xl max-w-xl w-full mt-8 overflow-hidden'
        open={open}
        closeModal={closeModal}
      >
        <WaveReplyModal wave={wave} closeModal={closeModal} />
      </Modal>
      <div className='flex flex-col gap-2'>
        {reply && (
          <div className='flex w-12 items-center justify-center'>
            <i className='hover-animation h-2 w-0.5 bg-light-line-reply dark:bg-dark-line-reply' />
          </div>
        )}
        <div className='grid grid-cols-[auto,1fr] gap-3'>
          <UserTooltip avatar {...waveUserData}>
            <UserAvatar src={photoURL} alt={name} username={username} />
          </UserTooltip>
          <div className='flex min-w-0 justify-between'>
            <div className='flex flex-col truncate xs:overflow-visible xs:whitespace-normal'>
              <UserTooltip {...waveUserData}>
                <UserName
                  className='-mb-1'
                  name={name}
                  username={username}
                  verified={verified}
                />
              </UserTooltip>
              <UserTooltip {...waveUserData}>
                <UserUsername username={username} />
              </UserTooltip>
            </div>
            <div className='px-4'>
              <WaveActions
                viewWave
                isOwner={isOwner}
                ownerId={ownerId}
                waveId={waveId}
                parentId={parentId}
                username={username}
                hasImages={!!images}
                createdBy={createdBy}
              />
            </div>
          </div>
        </div>
      </div>
      {reply && (
        <p className='text-light-secondary dark:text-dark-secondary'>
          Replying to{' '}
          <Link href={`/user/${parentUsername}`}>
            <a className='custom-underline text-main-accent'>
              @{parentUsername}
            </a>
          </Link>
        </p>
      )}
      <div>
        {text && (
          <p className='whitespace-pre-line break-words text-2xl'>{text}</p>
        )}
        {images && (
          <ImagePreview
            viewWave
            imagesPreview={images}
            previewCount={images.length}
          />
        )}
        <div
          className='inner:hover-animation inner:border-b inner:border-light-border
                     dark:inner:border-dark-border'
        >
          <WaveDate viewWave waveLink={waveLink} createdAt={createdAt} />
          <WaveStats
            viewWave
            reply={reply}
            userId={userId}
            isOwner={isOwner}
            waveId={waveId}
            userLikes={userLikes}
            userRewaves={userRewaves}
            userReplies={userReplies}
            openModal={openModal}
          />
        </div>
        <Input reply parent={{ id: waveId, username: username }} />
      </div>
    </motion.article>
  );
}
