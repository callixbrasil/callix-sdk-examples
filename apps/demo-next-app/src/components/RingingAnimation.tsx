'use client';
import { useEffect, useState } from 'react';

export function RingingAnimation() {
  const [visible, setVisible] = useState(true);

  // Simple animation that toggles visibility every 500ms
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex justify-center my-4">
      <div className="relative">
        <div
          className={`absolute inset-0 rounded-full bg-green-500 opacity-30 ${visible ? 'scale-150' : 'scale-100'} transition-transform duration-500`}
        />
        <div className="relative z-10 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-white"
            aria-hidden="true"
          >
            <title>Phone</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
