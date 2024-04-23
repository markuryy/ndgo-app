import type { Timestamp, FirestoreDataConverter } from 'firebase/firestore';
import type { ImagesPreview } from './file';
import type { User } from './user';

export type Wave = {
  id: string;
  text: string | null;
  images: ImagesPreview | null;
  parent: { id: string; username: string } | null;
  userLikes: string[];
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp | null;
  userReplies: number;
  userRewaves: string[];
  isSensitive: boolean;
};

export type WaveWithUser = Wave & { user: User };

export const waveConverter: FirestoreDataConverter<Wave> = {
  toFirestore(wave) {
    return { ...wave };
  },
  fromFirestore(snapshot, options) {
    const { id } = snapshot;
    const data = snapshot.data(options);

    return { id, ...data } as Wave;
  }
};
