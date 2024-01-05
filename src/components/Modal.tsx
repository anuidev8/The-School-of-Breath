import React, { useState } from 'react';
import { SoundEffectControl } from './SoundEfectControl';
import { useDeviceOS } from '../hooks/useDeviceOS';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { GoMute  ,GoUnmute } from "react-icons/go";
interface AudioControlModalProps {
    audioRef: React.RefObject<HTMLAudioElement>;
    soundEffectRefs: Map<string, React.RefObject<HTMLAudioElement>>;
    isOpen:boolean;
    onOpenChange:()=>void
  }

  export const AudioControlModal: React.FC<AudioControlModalProps> = ({  audioRef, soundEffectRefs,isOpen,onOpenChange }) => {
    const [backgroundVolume, setBackgroundVolume] = useState(1);
    const os = useDeviceOS()
    const [isMuted, setIsMuted] = useState(false);
  
    
    const handleBackgroundVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const volume = parseFloat(e.target.value);
        setBackgroundVolume(volume);
        if (audioRef.current) {
          audioRef.current.volume = volume;
        }
      };
      
      const toggleMute = () => {
        const newMutedState = !isMuted;
        setIsMuted(newMutedState);
        if(audioRef){
          if (audioRef.current) {
            audioRef.current.muted = newMutedState;
          }
        }
       
      };
  
    return (
      <Modal placement={'center'} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Audio Controls</ModalHeader>
              <ModalBody>
            
        <div>
        <label>Background Volume: </label>
          {
            os !== 'iOS' && 
            <>
       
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={backgroundVolume}
            onChange={handleBackgroundVolumeChange}
          />
            </>
          }
           <Button isIconOnly size='sm' className='text-xl' onClick={toggleMute}>{isMuted ? <GoUnmute /> : <GoMute/>}</Button>
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
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
               
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      
    );
  };