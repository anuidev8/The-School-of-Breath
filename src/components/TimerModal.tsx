import React from 'react';

import '../styles/Timer.css'
import TimerPicker from './TimerPicker';

interface TimerModalProps {
    onClose: () => void;

    onTimerEnd: () => void;
    onShow:boolean
    resetSignal?:boolean
  }
  
  const TimerModal: React.FC<TimerModalProps> = ({
    onClose,
    onTimerEnd,
    onShow,
    resetSignal
  }) => {
   
  
    return (
      <div className={`timer-modal ${onShow ? 'timer-modal-open' : 'timer-modal-close' }`}>
        <TimerPicker
        resetSignal={resetSignal}
        onTimerEnd={onTimerEnd}
        />
        <button className="close-button btn btn-close" onClick={onClose}>Close</button>
      </div>
    );
  };
  
  export default TimerModal;