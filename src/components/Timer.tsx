import React, { useState, useEffect } from 'react';
import TimerPicker from './TimerPicker';

const Timer = ({ onTimerEnd }) => {
  const [timerDuration, setTimerDuration] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  const handleTimerValueChange = (values) => {
    const totalSeconds = parseInt(values.hours) * 3600 +
                         parseInt(values.minutes) * 60 +
                         parseInt(values.seconds);
    setTimerDuration(totalSeconds);
    setTimeLeft(totalSeconds);
  };

  useEffect(() => {
    let interval = null;

    if (timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      onTimerEnd();
    }

    return () => clearInterval(interval);
  }, [timeLeft, onTimerEnd]);

  return (
    <div>
      <TimerPicker onChange={handleTimerValueChange} />
      <div>Time Left: {timeLeft} seconds</div>
      {/* Additional controls for starting, pausing, or resetting the timer */}
    </div>
  );
};

export default Timer;
