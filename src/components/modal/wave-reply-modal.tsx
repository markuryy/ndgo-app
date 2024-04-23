import { Input } from '@components/input/input';
import { Wave } from '@components/wave/wave';
import type { WaveProps } from '@components/wave/wave';

type WaveReplyModalProps = {
  wave: WaveProps;
  closeModal: () => void;
};

export function WaveReplyModal({
  wave,
  closeModal
}: WaveReplyModalProps): JSX.Element {
  return (
    <Input
      modal
      replyModal
      parent={{ id: wave.id, username: wave.user.username }}
      closeModal={closeModal}
    >
      <Wave modal parentWave {...wave} />
    </Input>
  );
}
