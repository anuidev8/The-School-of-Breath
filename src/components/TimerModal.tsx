import React from 'react';

import '../styles/Timer.css'
import TimerPicker from './TimerPicker';

interface TimerModalProps {
    onClose: () => void;

    onTimerEnd: () => void;
    onShow:boolean
  }
  
  const TimerModal: React.FC<TimerModalProps> = ({
    onClose,
    onTimerEnd,
    onShow
  }) => {
   
  
    return (
      <div className={`timer-modal ${onShow ? 'timer-modal-open' : 'timer-modal-close' }`}>
        <TimerPicker
        onTimerEnd={onTimerEnd}
        />
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    );
  };
  
  export default TimerModal;