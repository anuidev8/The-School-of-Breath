import { FC, useState } from "react";
import { useDeviceOS } from "../hooks/useDeviceOS";

interface SoundEffectControlProps {
  effectName: string;
  audioRef: React.RefObject<HTMLAudioElement> | undefined;
}
export const SoundEffectControl: FC<SoundEffectControlProps> = ({
  effectName,
  audioRef,
}) => {
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const os = useDeviceOS();
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (audioRef) {
      setVolume(newVolume);
      if (audioRef.current) {
        audioRef.current.volume = newVolume;
      }
    }
  };

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    if (audioRef) {
      if (audioRef.current) {
        audioRef.current.muted = newMutedState;
      }
    }
  };

  return (
    <div className="sound-effect-control">
      <h4>{effectName}</h4>
      {os !== "iOS" && (
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          disabled={isMuted}
        />
      )}
      <button onClick={toggleMute}>{isMuted ? "Unmute" : "Mute"}</button>
    </div>
  );
};
