import React, { useEffect, useState } from 'react';

import '../styles/Timer.css'

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import Picker from 'react-mobile-picker';

interface TimerModalProps {
 

    onTimerEnd: () => void;

    resetSignal?:boolean;
    isOpen:boolean;
    onOpenChange:()=>void;
  }

  type TimerSelections = {
    hours: string[];
    minutes: string[];
    seconds: string[];
  };
  
 
  
  const TimerModal: React.FC<TimerModalProps> = ({
    isOpen,
    onTimerEnd,
    onOpenChange,
    resetSignal
  }) => {
   
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
  
        
      useEffect(()=>{
        if(resetSignal) {
          resetTimer()
        }
      },[resetSignal])
    return (
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Timer</ModalHeader>
            <ModalBody>
            <div>
      <Picker color='red' value={timerValue} onChange={handlePickerChange}>
        {(Object.keys(timerSelections) as Array<keyof TimerSelections>).map(part => (
          <Picker.Column   key={part} name={part}>
            {timerSelections[part].map(option => (
              <Picker.Item className='text-black'  style={{
                borderColor:'black',
                
               
              }}   frameBorder={2} key={option} value={option}>
                {option}
              </Picker.Item>
            ))}
          </Picker.Column>
        ))}
      </Picker>
      <p className='text-black '>Selected Time: {formatSelectedTime()}</p>
      <p className='text-black'>Remaining Time: {remainingSeconds > 0 ? formatRemainingTime() : timeUpMessage}</p>
      <div className='mt-5'></div>
      <Button size='sm' className='mr-2 bg-black/50' onClick={startTimer}>Start</Button>
      <Button size='sm' className='mr-2 bg-black/50' onClick={pauseTimer}>Pause</Button>
      <Button size='sm' className='mr-2 bg-black/50' onClick={resetTimer}>Reset</Button>
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
  
  export default TimerModal;