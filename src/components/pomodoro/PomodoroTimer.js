import React, { useState, useEffect } from 'react';
// import './PomodoroTimer.css';

const PomodoroTimer = () => {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [type, setType] = useState('work');

  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(time => time - 1);
      }, 1000);
    } else if (time === 0) {
      new Audio('bell.mp3').play();
      setType(type === 'work' ? 'break' : 'work');
      setTime(type === 'work' ? 5 * 60 : 25 * 60);
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, time, type]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setTime(25 * 60);
    setIsActive(false);
    setType('work');
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="pomodoro-timer">
      <div className="timer-circle" style={{background: `conic-gradient(
        #4a90e2 ${(time / (type === 'work' ? 25 * 60 : 5 * 60)) * 360}deg,
        #f0f0f0 ${(time / (type === 'work' ? 25 * 60 : 5 * 60)) * 360}deg
      )`}}>
        <div className="time">
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </div>
      </div>
      <div className="timer-type">{type === 'work' ? 'Work' : 'Break'}</div>
      <div className="timer-controls">
        <button onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default PomodoroTimer;