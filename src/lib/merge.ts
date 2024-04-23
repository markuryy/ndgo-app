import type { Timestamp } from 'firebase/firestore';

type DataWithDate<T> = T & { createdAt: Timestamp };

export function mergeData<T>(
  sortData: boolean,
  ...waves: (DataWithDate<T>[] | null)[]
): DataWithDate<T>[] | null {
  const validData = waves.filter((wave) => wave) as DataWithDate<T>[][];
  const mergeData = validData.reduce((acc, wave) => [...acc, ...wave], []);

  return mergeData.length
    ? sortData
      ? mergeData.sort((a, b) => +b.createdAt.toDate() - +a.createdAt.toDate())
      : mergeData
    : null;
}
