import React, { useEffect, useState } from 'react';
import Picker from 'react-mobile-picker';

type TimerSelections = {
  hours: string[];
  minutes: string[];
  seconds: string[];
};

type TimerPickerProps = {
    onTimerEnd: () => void; // Prop for the TimerEnd callback
  };
  
  const TimerPicker: React.FC<TimerPickerProps> = ({ onTimerEnd }) => {
  const timerSelections: TimerSelections = {
    hours: Array.from({ length: 24 }, (_, i) => i.toString()),
    minutes: Array.from({ length: 60 }, (_, i) => i.toString()),
    seconds: Array.from({ length: 60 }, (_, i) => i.toString())
  };

  const [timerValue, setTimerValue] = useState({
    hours: '0',
    minutes: '0',
    seconds: '0'
  });

  // Function to format the time into a readable string
 /*  const formatTime = (time: { hours: string; minutes: string; seconds: string }) => {
    return `${time.hours}h: Min ${time.minutes}${time.seconds}s`;
  };
 */
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [timerId, setTimerId] = useState<ReturnType<typeof setInterval> | null>(null);
  const [timeUpMessage, setTimeUpMessage] = useState('');
  useEffect(() => {
    if (timerActive && remainingSeconds > 0) {
      const id = setInterval(() => {
        setRemainingSeconds(seconds => {
          if (seconds <= 1) {
            clearInterval(id);
            setTimerActive(false);
            setTimeUpMessage('Time Up!');
            onTimerEnd(); // Invoke the callback when the timer ends
          }
          return seconds - 1;
        });
      }, 1000);

      setTimerId(id);
    }

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [timerActive, remainingSeconds, onTimerEnd]);

  const startTimer = () => {
    if (!timerActive) {
      if (remainingSeconds === 0) {
        // Initialize the countdown timer
        const totalSeconds =
          parseInt(timerValue.hours) * 3600 +
          parseInt(timerValue.minutes) * 60 +
          parseInt(timerValue.seconds);
        setRemainingSeconds(totalSeconds);
      }
      setTimerActive(true);
    }
  };

  const pauseTimer = () => {
    setTimerActive(false);
  };

  const resetTimer = () => {
    if (timerId) clearInterval(timerId);
    setTimerActive(false);
    setTimeUpMessage('');
  
    // Reset the remainingSeconds based on the current timerValue
    const totalSeconds =
      parseInt(timerValue.hours) * 3600 +
      parseInt(timerValue.minutes) * 60 +
      parseInt(timerValue.seconds);
    setRemainingSeconds(totalSeconds);
  };

  // Function to format the remaining time
  const formatRemainingTime = () => {
    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;
    return `${hours} H : ${minutes} MIN : ${seconds} SECONDS`;
  };


    // Function to format the selected time
    const formatSelectedTime = () => {
        return `${timerValue.hours} : ${timerValue.minutes} : ${timerValue.seconds}`;
      };

      const handlePickerChange = (newValue: {
        hours: string;
        minutes: string;
        seconds: string;
    }) => {
        setTimerValue(newValue);
        setTimeUpMessage('');
        
        // Reset the remaining seconds based on the new timerValue
        const totalSeconds =
          parseInt(newValue.hours) * 3600 +
          parseInt(newValue.minutes) * 60 +
          parseInt(newValue.seconds);
        setRemainingSeconds(totalSeconds);
      };
  return (
    <div>
      <Picker value={timerValue} onChange={handlePickerChange}>
        {(Object.keys(timerSelections) as Array<keyof TimerSelections>).map(part => (
          <Picker.Column key={part} name={part}>
            {timerSelections[part].map(option => (
              <Picker.Item key={option} value={option}>
                {option}
              </Picker.Item>
            ))}
          </Picker.Column>
        ))}
      </Picker>
      <p>Selected Time: {formatSelectedTime()}</p>
      <p>Remaining Time: {remainingSeconds > 0 ? formatRemainingTime() : timeUpMessage}</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={pauseTimer}>Pause</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
};

export default TimerPicker;
