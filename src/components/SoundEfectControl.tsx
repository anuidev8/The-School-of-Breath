import { FC, useState } from "react";
import { Howl } from 'howler';

interface SoundEffectControlProps {
  effectName: string;
  soundEffect: Howl;
}

export const SoundEffectControl: FC<SoundEffectControlProps> = ({ effectName, soundEffect }) => {
  const [volume, setVolume] = useState<number>(soundEffect.volume());
  const [isMuted, setIsMuted] = useState<boolean>(soundEffect.mute());

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    soundEffect.volume(newVolume);
  };

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    soundEffect.mute(newMutedState);
  };

  return (
    <div className="sound-effect-control">
      <h4>{effectName}</h4>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
        disabled={isMuted}
      />
      <button onClick={toggleMute}>{isMuted ? 'Unmute' : 'Mute'}</button>
    </div>
  );
};
