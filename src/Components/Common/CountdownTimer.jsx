import { Code } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';

function CountdownTimer({initialTime=18000}) {
  // Initial time in seconds (e.g., 1 hour)
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    // Only set interval if timeLeft is greater than 0
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);

      // Cleanup the interval on component unmount
      return () => clearInterval(interval);
    }
  }, [timeLeft]);

  // Convert seconds to hours, minutes, and seconds
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  // Format time with leading zeros
  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  return (
    <div>
      <h1 className='text-md text-black gap-1 flex items-center text-5xl'>
       <Code className='text-blue-500 text-5xl'>{formatTime(hours)}</Code>:
       <Code className='text-blue-500 text-5xl'>{formatTime(minutes)}</Code>:
       <Code className='text-blue-500 text-5xl'>{formatTime(seconds)}</Code>
       </h1>
    </div>
  );
}

export default CountdownTimer;
