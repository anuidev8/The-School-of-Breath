import React, { createContext, useState, useContext,FC, useEffect } from 'react';

type BackgroundContextType = {
  selectedBackground: string;
  selectBackground: (background: string) => void;
  activeSoundEffects: Set<string>;
  setActiveSoundEffects: (effects: Set<string>) => void;
  hasInteracted: boolean;
  handleUserInteraction: () => void;
};

const defaultState: BackgroundContextType = {
  selectedBackground: '',
  selectBackground: () => {},
  activeSoundEffects: new Set(),
  setActiveSoundEffects: () => {},
  hasInteracted: false,
  handleUserInteraction: () => {},
};
  const BackgroundContext = createContext<BackgroundContextType>(defaultState);
  
  export const useBackground = () => useContext(BackgroundContext);

interface BackgroundProviderTypes {
    children:React.ReactNode
}

export const BackgroundProvider: FC<BackgroundProviderTypes> = ({ children }) => {
  const [selectedBackground, setSelectedBackground] = useState<string>('');
  const [activeSoundEffects, setActiveSoundEffectsState] = useState<Set<string>>(new Set());
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  useEffect(() => {
    const savedBackground = localStorage.getItem('selectedBackground');
    const savedActiveEffects = localStorage.getItem('activeSoundEffects');
    if (savedBackground) {
      setSelectedBackground(savedBackground);
    }
    if (savedActiveEffects) {
      setActiveSoundEffectsState(new Set(JSON.parse(savedActiveEffects)));
    }
  }, []);

  const selectBackground = (background: string) => {
    setSelectedBackground(background);
    localStorage.setItem('selectedBackground', background);
  };

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
      handleUserInteraction
    }}>
      {children}
    </BackgroundContext.Provider>
  );
};