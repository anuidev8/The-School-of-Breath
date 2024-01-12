import { FC, useEffect, useState } from "react";
import { useDeviceOS } from "../hooks/useDeviceOS";
import { GoMute, GoUnmute } from "react-icons/go";
import { Button } from "@nextui-org/react";

interface SoundEffectControlProps {
  effectName: string;
  audioRef: React.RefObject<HTMLAudioElement> | undefined;
  isMuted: boolean; // Added prop for the mute state
  onToggleMute: () => void; // Added prop for the function to toggle mute
}

export const SoundEffectControl: FC<SoundEffectControlProps> = ({
  effectName,
  audioRef,
  isMuted, // Using the prop
  onToggleMute, // Using the prop
}) => {
  const [volume, setVolume] = useState(1);
  const os = useDeviceOS();

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef?.current) {
      audioRef.current.volume = newVolume;
    }
  };
  useEffect(() => {
    if (audioRef && audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted, audioRef]);
  return (
    <div className="sound-effect-control flex items-center">
      <h4 className="mt-0">{effectName}</h4>
      {os !== "iOS" && (
        <input
          type="range"
          min="0"
          max=".03"
          step="0.005"
          value={volume}
          onChange={handleVolumeChange}
          disabled={isMuted}
        />
      )}
      <Button isIconOnly size='sm' className='text-xl' onClick={onToggleMute}>
        {isMuted ? <GoUnmute /> : <GoMute />}
      </Button>
    </div>
  );
};
