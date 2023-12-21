import React, { useState } from 'react';
import { SoundEffectControl } from './SoundEfectControl';
interface AudioControlModalProps {
    onClose: () => void;
    audioRef: React.RefObject<HTMLAudioElement>;
    soundEffectRefs: Map<string, React.RefObject<HTMLAudioElement>>;
  }

  export const AudioControlModal: React.FC<AudioControlModalProps> = ({ onClose, audioRef, soundEffectRefs }) => {
    const [backgroundVolume, setBackgroundVolume] = useState(1);
  
  
    const handleBackgroundVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const volume = parseFloat(e.target.value);
        setBackgroundVolume(volume);
        if (audioRef.current) {
          audioRef.current.volume = volume;
        }
      };
      
      
  
    return (
      <div className="audio-control-modal">
        <h2>Audio Controls</h2>
        <div>
          <label>Background Volume: </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={backgroundVolume}
            onChange={handleBackgroundVolumeChange}
          />
        </div>
        <div>
          <label style={{ fontWeight:'bold',marginTop:'2px' }}>Effects Volume: </label>
          {
            soundEffectRefs && 
            Array.from(soundEffectRefs.keys()).map((effectName) => (
              
                <SoundEffectControl
                  key={effectName}
                  effectName={effectName}
                  audioRef={soundEffectRefs.get(effectName) }
                />
              ))
          }
       
        </div>
        <button className='btn  close-btn' onClick={onClose}>Close</button>
      </div>
    );
  };

