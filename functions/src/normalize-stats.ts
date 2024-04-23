import { functions, firestore, regionalFunctions } from './lib/utils';
import { waveConverter, bookmarkConverter } from './types';
import type { Wave } from './types';

export const normalizeStats = regionalFunctions.firestore
  .document('waves/{waveId}')
  .onDelete(async (snapshot): Promise<void> => {
    const waveId = snapshot.id;
    const waveData = snapshot.data() as Wave;

    functions.logger.info(`Normalizing stats from wave ${waveId}`);

    const { userRewaves, userLikes } = waveData;

    const usersStatsToDelete = new Set([...userRewaves, ...userLikes]);

    const batch = firestore().batch();

    usersStatsToDelete.forEach((userId) => {
      functions.logger.info(`Deleting stats from ${userId}`);

      const userStatsRef = firestore()
        .doc(`users/${userId}/stats/stats`)
        .withConverter(waveConverter);

      batch.update(userStatsRef, {
        waves: firestore.FieldValue.arrayRemove(waveId),
        likes: firestore.FieldValue.arrayRemove(waveId)
      });
    });

    const bookmarksQuery = firestore()
      .collectionGroup('bookmarks')
      .where('id', '==', waveId)
      .withConverter(bookmarkConverter);

    const docsSnap = await bookmarksQuery.get();

    functions.logger.info(`Deleting ${docsSnap.size} bookmarks`);

    docsSnap.docs.forEach(({ id, ref }) => {
      functions.logger.info(`Deleting bookmark ${id}`);
      batch.delete(ref);
    });

    await batch.commit();

    functions.logger.info(`Normalizing stats for wave ${waveId} is done`);
  });
