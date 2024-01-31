import React, { createContext, useState, useContext,FC, useEffect } from 'react';
import { Music } from '../types/music';

type BackgroundContextType = {
  selectedBackground: Music | null;
  selectBackground: (music: Music) => void;
  activeSoundEffects: Set<string>;
  setActiveSoundEffects: (effects: Set<string>) => void;
  hasInteracted: boolean;
  handleUserInteraction: () => void;
  setCategorySelected:(category:string) => void 
};

const defaultState: BackgroundContextType = {
  selectedBackground: null,
  selectBackground: () => {},
  activeSoundEffects: new Set(),
  setActiveSoundEffects: () => {},
  hasInteracted: false,
  handleUserInteraction: () => {},
  setCategorySelected:() => {},
};
  const BackgroundContext = createContext<BackgroundContextType>(defaultState);
  
  export const useBackground = () => useContext(BackgroundContext);

interface BackgroundProviderTypes {
    children:React.JSX.Element
}

export const BackgroundProvider: FC<BackgroundProviderTypes> = ({ children }) => {
  const [selectedBackground, setSelectedBackground] = useState<Music | null>(null);

  const [activeSoundEffects, setActiveSoundEffectsState] = useState<Set<string>>(new Set());
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  useEffect(() => {
    const savedBackground = localStorage.getItem('selectedBackground');
    const savedActiveEffects = localStorage.getItem('activeSoundEffects');
    if (savedBackground) {
      setSelectedBackground(JSON.parse(savedBackground));
    }
    if (savedActiveEffects) {
      setActiveSoundEffectsState(new Set(JSON.parse(savedActiveEffects)));
    }
  }, []);

  const selectBackground = (music: Music) => {
    setSelectedBackground(music);
    localStorage.setItem('selectedBackground', JSON.stringify(music));
  };

  const setCategorySelected = (category:string) =>{
    localStorage.setItem('categorySelected', category);
  }

  const setActiveSoundEffects = (effects: Set<string>) => {
    setActiveSoundEffectsState(effects);
    localStorage.setItem('activeSoundEffects', JSON.stringify(Array.from(effects)));
  };

  const handleUserInteraction = () => {
    setHasInteracted(true);
  };

  return (
    <BackgroundContext.Provider value={{
      selectedBackground,
      selectBackground,
      activeSoundEffects,
      setActiveSoundEffects,
      hasInteracted,
      handleUserInteraction,
      setCategorySelected
    }}>
      {children}
    </BackgroundContext.Provider>
  );
};