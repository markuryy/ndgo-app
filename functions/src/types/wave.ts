import type {
  Timestamp,
  FirestoreDataConverter
} from 'firebase-admin/firestore';

export type ImageData = {
  src: string;
  alt: string;
};

export type ImagesPreview = (ImageData & {
  id: number;
})[];

export type Wave = {
  text: string | null;
  images: ImagesPreview | null;
  parent: { id: string; username: string } | null;
  userLikes: string[];
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp | null;
  userReplies: number;
  userRewaves: string[];
};

export const waveConverter: FirestoreDataConverter<Wave> = {
  toFirestore(wave) {
    return { ...wave };
  },
  fromFirestore(snapshot) {
    const data = snapshot.data();

    return { ...data } as Wave;
  }
};
