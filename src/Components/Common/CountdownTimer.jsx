import { Code } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import { getRemainingMinutes } from '../../lib/helper';
import { useNavigate } from 'react-router-dom';

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(getRemainingMinutes() * 60); // Initialize with remaining time in seconds

  const navigate = useNavigate()
  useEffect(() => {
    
    const updateRemainingTime = () => {
      const remainingMinutes = getRemainingMinutes();
      if (remainingMinutes <= 0) {
        sessionStorage.removeItem('authToken'); // Remove token if expired
        setTimeLeft(0); // Set time left to zero
      } else {
        setTimeLeft(remainingMinutes * 60); // Update time left in seconds
      }
    };

    updateRemainingTime(); // Initial call to set the time left

    const interval = setInterval(() => {
      const remainingMinutes = getRemainingMinutes();
      if (remainingMinutes <= 0) {
        sessionStorage.removeItem('authToken'); // Remove token if expired
        setTimeLeft(0); // Set time left to zero
        clearInterval(interval); // Stop the interval if time is up
      } else {
        // setTimeLeft(remainingMinutes * 60); 
        setTimeLeft(timeLeft => timeLeft - 1)// Update time left
      }
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Convert seconds to hours, minutes, and seconds
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  // Format time with leading zeros
  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  return (
    <div>
      <h1 className='text-md text-black gap-1 flex items-center text-5xl'>
        <Code className={`bg-blue-500 text-white text-5xl ${minutes<5?"bg-red-600 animate-pulse":""}`}>{formatTime(hours)}</Code>:
        <Code className={`bg-blue-500 text-white text-5xl ${minutes<5?"bg-red-600 animate-pulse":""}`}>{formatTime(minutes)}</Code>:
        <Code className={`bg-blue-500 text-white text-5xl ${minutes<5?"bg-red-600 animate-pulse":""}`}>{formatTime(seconds)}</Code>
        {minutes === 0 && seconds=== 0?(navigate("/auth?login")):""}
      </h1>
    </div>
  );
}

export default CountdownTimer;

