'use client';
import type { Call } from '@callixbrasil/client-sdk';
import { useEffect, useState } from 'react';

interface CallTimerProps {
  call: Call | null;
}

export function CallTimer({ call }: CallTimerProps) {
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!call) {
      setDuration(0);
      return;
    }

    // Set initial duration
    setDuration(call.currentDurationSeconds);

    // Update timer every second
    const timer = setInterval(() => {
      if (call) {
        setDuration(call.currentDurationSeconds);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [call]);

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return <div className="text-2xl font-bold text-center py-4">{formatTime(duration)}</div>;
}
