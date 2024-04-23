import { useState } from 'react';
import { Wave } from './wave';
import { WaveParent } from './wave-parent';
import type { WaveWithUser } from '@lib/types/wave';

type WaveWithParentProps = {
  data: WaveWithUser[];
};

export type LoadedParents = Record<'parentId' | 'childId', string>[];

export function WaveWithParent({ data }: WaveWithParentProps): JSX.Element {
  const [loadedParents, setLoadedParents] = useState<LoadedParents>([]);

  const addParentId = (parentId: string, targetChildId: string): void =>
    setLoadedParents((prevLoadedParents) =>
      prevLoadedParents.some((item) => item.parentId === parentId)
        ? prevLoadedParents
        : [...prevLoadedParents, { parentId, childId: targetChildId }]
    );

  const filteredData = data.filter(
    (child) => !loadedParents.some((parent) => parent.parentId === child.id)
  );

  return (
    <>
      {filteredData.map((wave) => (
        <div className='[&>article:nth-child(2)]:-mt-1' key={wave.id}>
          {wave.parent && (
            <WaveParent
              parentId={wave.parent.id}
              loadedParents={loadedParents}
              addParentId={addParentId}
            />
          )}
          <Wave {...wave} />
        </div>
      ))}
    </>
  );
}
