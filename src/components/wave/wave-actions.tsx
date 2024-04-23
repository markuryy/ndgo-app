import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import { Popover } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'clsx';
import { toast } from 'react-hot-toast';
import { useAuth } from '@lib/context/auth-context';
import { useModal } from '@lib/hooks/useModal';
import { wavesCollection } from '@lib/firebase/collections';
import {
  removeWave,
  manageReply,
  manageFollow,
  managePinnedWave,
  manageTotalWaves,
  manageTotalPhotos
} from '@lib/firebase/utils';
import { delayScroll, preventBubbling, sleep } from '@lib/utils';
import { Modal } from '@components/modal/modal';
import { ActionModal } from '@components/modal/action-modal';
import { Button } from '@components/ui/button';
import { ToolTip } from '@components/ui/tooltip';
import { HeroIcon } from '@components/ui/hero-icon';
import { CustomIcon } from '@components/ui/custom-icon';
import type { Variants } from 'framer-motion';
import type { Wave } from '@lib/types/wave';
import type { User } from '@lib/types/user';

export const variants: Variants = {
  initial: { opacity: 0, y: -25 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', duration: 0.4 }
  },
  exit: { opacity: 0, y: -25, transition: { duration: 0.2 } }
};

type WaveActionsProps = Pick<Wave, 'createdBy'> & {
  isOwner: boolean;
  ownerId: string;
  waveId: string;
  username: string;
  parentId?: string;
  hasImages: boolean;
  viewWave?: boolean;
};

type PinModalData = Record<'title' | 'description' | 'mainBtnLabel', string>;

const pinModalData: Readonly<PinModalData[]> = [
  {
    title: 'Pin Wave to from profile?',
    description:
      'This will appear at the top of your profile and replace any previously pinned Wave.',
    mainBtnLabel: 'Pin'
  },
  {
    title: 'Unpin Wave from profile?',
    description:
      'This will no longer appear automatically at the top of your profile.',
    mainBtnLabel: 'Unpin'
  }
];

export function WaveActions({
  isOwner,
  ownerId,
  waveId,
  parentId,
  username,
  hasImages,
  viewWave,
  createdBy
}: WaveActionsProps): JSX.Element {
  const { user, isAdmin } = useAuth();
  const { push } = useRouter();

  const {
    open: removeOpen,
    openModal: removeOpenModal,
    closeModal: removeCloseModal
  } = useModal();

  const {
    open: pinOpen,
    openModal: pinOpenModal,
    closeModal: pinCloseModal
  } = useModal();

  const { id: userId, following, pinnedWave } = user as User;

  const isInAdminControl = isAdmin && !isOwner;
  const waveIsPinned = pinnedWave === waveId;

  const handleRemove = async (): Promise<void> => {
    if (viewWave)
      if (parentId) {
        const parentSnapshot = await getDoc(doc(wavesCollection, parentId));
        if (parentSnapshot.exists()) {
          await push(`/wave/${parentId}`, undefined, { scroll: false });
          delayScroll(200)();
          await sleep(50);
        } else await push('/home');
      } else await push('/home');

    await Promise.all([
      removeWave(waveId),
      manageTotalWaves('decrement', ownerId),
      hasImages && manageTotalPhotos('decrement', createdBy),
      parentId && manageReply('decrement', parentId)
    ]);

    toast.success(
      `${isInAdminControl ? `@${username}'s` : 'Your'} Wave was deleted`
    );

    removeCloseModal();
  };

  const handlePin = async (): Promise<void> => {
    await managePinnedWave(waveIsPinned ? 'unpin' : 'pin', userId, waveId);
    toast.success(
      `Your wave was ${waveIsPinned ? 'unpinned' : 'pinned'} to your profile`
    );
    pinCloseModal();
  };

  const handleFollow =
    (closeMenu: () => void, ...args: Parameters<typeof manageFollow>) =>
    async (): Promise<void> => {
      const [type] = args;

      closeMenu();
      await manageFollow(...args);

      toast.success(
        `You ${type === 'follow' ? 'followed' : 'unfollowed'} @${username}`
      );
    };

  const userIsFollowed = following.includes(createdBy);

  const currentPinModalData = useMemo(
    () => pinModalData[+waveIsPinned],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pinOpen]
  );

  return (
    <>
      <Modal
        modalClassName='max-w-xs bg-main-background w-full p-8 rounded-2xl'
        open={removeOpen}
        closeModal={removeCloseModal}
      >
        <ActionModal
          title='Delete Wave?'
          description={`This can’t be undone and it will be removed from ${
            isInAdminControl ? `@${username}'s` : 'your'
          } profile, the timeline of any accounts that follow ${
            isInAdminControl ? `@${username}` : 'you'
          }, and from ndgo search results.`}
          mainBtnClassName='bg-accent-red hover:bg-accent-red/90 active:bg-accent-red/75 accent-tab
                            focus-visible:bg-accent-red/90'
          mainBtnLabel='Delete'
          focusOnMainBtn
          action={handleRemove}
          closeModal={removeCloseModal}
        />
      </Modal>
      <Modal
        modalClassName='max-w-xs bg-main-background w-full p-8 rounded-2xl'
        open={pinOpen}
        closeModal={pinCloseModal}
      >
        <ActionModal
          {...currentPinModalData}
          mainBtnClassName='bg-light-primary hover:bg-light-primary/90 active:bg-light-primary/80 dark:text-light-primary
                            dark:bg-light-border dark:hover:bg-light-border/90 dark:active:bg-light-border/75'
          focusOnMainBtn
          action={handlePin}
          closeModal={pinCloseModal}
        />
      </Modal>
      <Popover>
        {({ open, close }): JSX.Element => (
          <>
            <Popover.Button
              as={Button}
              className={cn(
                `main-tab group group absolute top-2 right-2 p-2 
                 hover:bg-accent-indigo/10 focus-visible:bg-accent-indigo/10
                 focus-visible:!ring-accent-indigo/80 active:bg-accent-indigo/20`,
                open && 'bg-accent-indigo/10 [&>div>svg]:text-accent-indigo'
              )}
            >
              <div className='group relative'>
                <HeroIcon
                  className='h-5 w-5 text-light-secondary group-hover:text-accent-indigo
                             group-focus-visible:text-accent-indigo dark:text-dark-secondary/80'
                  iconName='EllipsisHorizontalIcon'
                />
                {!open && <ToolTip tip='More' />}
              </div>
            </Popover.Button>
            <AnimatePresence>
              {open && (
                <Popover.Panel
                  className='menu-container group absolute top-[50px] right-2 whitespace-nowrap text-light-primary 
                             dark:text-dark-primary'
                  as={motion.div}
                  {...variants}
                  static
                >
                  {(isAdmin || isOwner) && (
                    <Popover.Button
                      className='accent-tab flex w-full gap-3 rounded-md rounded-b-none p-4 text-accent-red
                                 hover:bg-main-sidebar-background'
                      as={Button}
                      onClick={preventBubbling(removeOpenModal)}
                    >
                      <HeroIcon iconName='TrashIcon' />
                      Delete
                    </Popover.Button>
                  )}
                  {isOwner ? (
                    <Popover.Button
                      className='accent-tab flex w-full gap-3 rounded-md rounded-t-none p-4 hover:bg-main-sidebar-background'
                      as={Button}
                      onClick={preventBubbling(pinOpenModal)}
                    >
                      {waveIsPinned ? (
                        <>
                          <CustomIcon iconName='PinOffIcon' />
                          Unpin from profile
                        </>
                      ) : (
                        <>
                          <CustomIcon iconName='PinIcon' />
                          Pin to your profile
                        </>
                      )}
                    </Popover.Button>
                  ) : userIsFollowed ? (
                    <Popover.Button
                      className='accent-tab flex w-full gap-3 rounded-md rounded-t-none p-4 hover:bg-main-sidebar-background'
                      as={Button}
                      onClick={preventBubbling(
                        handleFollow(close, 'unfollow', userId, createdBy)
                      )}
                    >
                      <HeroIcon iconName='UserMinusIcon' />
                      Unfollow @{username}
                    </Popover.Button>
                  ) : (
                    <Popover.Button
                      className='accent-tab flex w-full gap-3 rounded-md rounded-t-none p-4 hover:bg-main-sidebar-background'
                      as={Button}
                      onClick={preventBubbling(
                        handleFollow(close, 'follow', userId, createdBy)
                      )}
                    >
                      <HeroIcon iconName='UserPlusIcon' />
                      Follow @{username}
                    </Popover.Button>
                  )}
                </Popover.Panel>
              )}
            </AnimatePresence>
          </>
        )}
      </Popover>
    </>
  );
}
