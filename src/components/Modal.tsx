import React, { useState } from 'react';
import { SoundEffectControl } from './SoundEfectControl';
import { Howl } from 'howler';
interface AudioControlModalProps {
  onClose: () => void;
  backgroundMusic: Howl | null;
  soundEffectRefs: Map<string, Howl>;
  activeSoundEffects: Set<string>; 
  // ... other props types
}

  export const AudioControlModal: React.FC<AudioControlModalProps> = ({onClose, backgroundMusic,soundEffectRefs ,activeSoundEffects}) => {
    const [volume, setVolume] = useState<number>(backgroundMusic ? backgroundMusic.volume() : 1);

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    backgroundMusic?.volume(newVolume);
  };

  /* const toggleMute = () => {
    if (backgroundMusic) {
      const isMuted = backgroundMusic.mute();
      backgroundMusic.mute(!isMuted);
    }
  }; */
   
  
  
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
          value={volume}
          onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
        />
        </div>
        <h2>Audio Controls</h2>
        <div>
      
        {Array.from(soundEffectRefs.entries())
          .filter(([effectName]) => activeSoundEffects.has(effectName)) // Filter active sound effects
          .map(([effectName, soundEffect]) => (
            <SoundEffectControl key={effectName} effectName={effectName} soundEffect={soundEffect} />
        ))}

        
        </div>
       {/*  <div>
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
       
        </div> */}
        <button className='btn  close-btn' onClick={onClose}>Close</button>
      </div>
    );
  };

