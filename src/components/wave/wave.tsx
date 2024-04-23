import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'clsx';
import { useAuth } from '@lib/context/auth-context';
import { useBlur } from '@lib/context/blur-context';
import { useModal } from '@lib/hooks/useModal';
import { delayScroll } from '@lib/utils';
import { Modal } from '@components/modal/modal';
import { WaveReplyModal } from '@components/modal/wave-reply-modal';
import { ImagePreview } from '@components/input/image-preview';
import { UserAvatar } from '@components/user/user-avatar';
import { UserTooltip } from '@components/user/user-tooltip';
import { UserName } from '@components/user/user-name';
import { UserUsername } from '@components/user/user-username';
import { WaveActions } from './wave-actions';
import { WaveStatus } from './wave-status';
import { WaveStats } from './wave-stats';
import { WaveDate } from './wave-date';
import type { Variants } from 'framer-motion';
import type { Wave } from '@lib/types/wave';
import type { User } from '@lib/types/user';

export type WaveProps = Wave & {
  user: User;
  modal?: boolean;
  pinned?: boolean;
  profile?: User | null;
  parentWave?: boolean;
};

export const variants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

export function Wave(wave: WaveProps): JSX.Element {
  const {
    id: waveId,
    text,
    modal,
    images,
    parent,
    pinned,
    profile,
    userLikes,
    createdBy,
    createdAt,
    parentWave,
    userReplies,
    userRewaves,
    isSensitive,
    user: waveUserData
  } = wave;

  const { id: ownerId, name, username, verified, photoURL } = waveUserData;

  const { user } = useAuth();

  const { open, openModal, closeModal } = useModal();

  const waveLink = `/wave/${waveId}`;

  const userId = user?.id as string;

  const isOwner = userId === createdBy;

  const { id: parentId, username: parentUsername = username } = parent ?? {};

  const {
    id: profileId,
    name: profileName,
    username: profileUsername
  } = profile ?? {};

  const reply = !!parent;
  const waveIsRewaveed = userRewaves.includes(profileId ?? '');

  const { isBlurred, toggleBlur } = useBlur();

  return (
    <motion.article
      {...(!modal ? { ...variants, layout: 'position' } : {})}
      animate={{
        ...variants.animate,
        ...(parentWave && { transition: { duration: 0.2 } })
      }}
    >
      <Modal
        className='flex items-start justify-center'
        modalClassName='bg-main-background rounded-2xl max-w-xl w-full my-8 overflow-hidden'
        open={open}
        closeModal={closeModal}
      >
        <WaveReplyModal wave={wave} closeModal={closeModal} />
      </Modal>
      <Link href={waveLink} scroll={!reply}>
        <a
          className={cn(
            `accent-tab hover-card relative flex flex-col 
             gap-y-4 px-4 py-3 outline-none duration-200`,
            parentWave
              ? 'mt-0.5 pt-2.5 pb-0'
              : 'border-b border-light-border dark:border-dark-border'
          )}
          draggable={false}
          onClick={delayScroll(200)}
        >
          <div className='grid grid-cols-[auto,1fr] gap-x-3 gap-y-1'>
            <AnimatePresence initial={false}>
              {modal ? null : pinned ? (
                <WaveStatus type='pin'>
                  <p className='text-sm font-bold'>Pinned Wave</p>
                </WaveStatus>
              ) : (
                waveIsRewaveed && (
                  <WaveStatus type='wave'>
                    <Link href={profileUsername as string}>
                      <a className='custom-underline truncate text-sm font-bold'>
                        {userId === profileId ? 'You' : profileName} Rewaveed
                      </a>
                    </Link>
                  </WaveStatus>
                )
              )}
            </AnimatePresence>
            <div className='flex flex-col items-center gap-2'>
              <UserTooltip avatar modal={modal} {...waveUserData}>
                <UserAvatar src={photoURL} alt={name} username={username} />
              </UserTooltip>
              {parentWave && (
                <i className='hover-animation h-full w-0.5 bg-light-line-reply dark:bg-dark-line-reply' />
              )}
            </div>
            <div className='flex min-w-0 flex-col'>
              <div className='flex justify-between gap-2 text-light-secondary dark:text-dark-secondary'>
                <div className='flex gap-1 truncate xs:overflow-visible xs:whitespace-normal'>
                  <UserTooltip modal={modal} {...waveUserData}>
                    <UserName
                      name={name}
                      username={username}
                      verified={verified}
                      className='text-light-primary dark:text-dark-primary'
                    />
                  </UserTooltip>
                  <UserTooltip modal={modal} {...waveUserData}>
                    <UserUsername username={username} />
                  </UserTooltip>
                  <WaveDate waveLink={waveLink} createdAt={createdAt} />
                </div>
                <div className='px-4'>
                  {!modal && (
                    <WaveActions
                      isOwner={isOwner}
                      ownerId={ownerId}
                      waveId={waveId}
                      parentId={parentId}
                      username={username}
                      hasImages={!!images}
                      createdBy={createdBy}
                    />
                  )}
                </div>
              </div>
              {(reply || modal) && (
                <p
                  className={cn(
                    'text-light-secondary dark:text-dark-secondary',
                    modal && 'order-1 my-2'
                  )}
                >
                  Replying to{' '}
                  <Link href={`/user/${parentUsername}`}>
                    <a className='custom-underline text-main-accent'>
                      @{parentUsername}
                    </a>
                  </Link>
                </p>
              )}
              {text && (
                <p className='whitespace-pre-line break-words'>{text}</p>
              )}
              <div className='mt-1 flex flex-col gap-2'>
                {images && (
                  <ImagePreview
                    wave
                    imagesPreview={images}
                    previewCount={images.length}
                    isBlurred={isSensitive && isBlurred}
                    onClick={toggleBlur}
                  />
                )}
                {!modal && (
                  <WaveStats
                    reply={reply}
                    userId={userId}
                    isOwner={isOwner}
                    waveId={waveId}
                    userLikes={userLikes}
                    userReplies={userReplies}
                    userRewaves={userRewaves}
                    openModal={!parent ? openModal : undefined}
                  />
                )}
              </div>
            </div>
          </div>
        </a>
      </Link>
    </motion.article>
  );
}
