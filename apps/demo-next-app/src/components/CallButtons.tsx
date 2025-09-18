'use client';
import { useCallOperatorCurrentCall, useCallOperatorCurrentCallControls } from '@callixbrasil/client-sdk-react';
import { useState } from 'react';
import { FaPause, FaPhone, FaPhoneSlash, FaPlay } from 'react-icons/fa';

interface CallButtonsProps {
  isConnected: boolean;
}

export function CallButtons({ isConnected }: CallButtonsProps) {
  const currentCall = useCallOperatorCurrentCall();
  const { answer, reject, hangup, hold, unhold } = useCallOperatorCurrentCallControls();

  const [onHold, setOnHold] = useState(false);

  const isIncoming = currentCall?.direction === 'incoming';

  function toggleHold() {
    const newOnHold = !onHold;
    setOnHold(newOnHold);

    if (newOnHold) {
      hold();
    } else {
      unhold();
    }
  }

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {isConnected ? (
        <>
          <button
            type="button"
            onClick={toggleHold}
            className={`px-6 py-3 flex items-center gap-2 ${
              onHold ? 'bg-blue-500 hover:bg-blue-600' : 'bg-yellow-500 hover:bg-yellow-600'
            } text-white rounded-lg transition-colors`}
          >
            {onHold ? <FaPlay /> : <FaPause />}
            {onHold ? 'Unhold' : 'Hold'}
          </button>

          <button
            type="button"
            onClick={() => hangup()}
            className="px-6 py-3 flex items-center gap-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <FaPhoneSlash />
            Hang Up
          </button>
        </>
      ) : (
        <>
          {isIncoming && (
            <button
              type="button"
              onClick={() => answer()}
              className="px-6 py-3 flex items-center gap-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <FaPhone />
              Answer
            </button>
          )}
          <button
            type="button"
            onClick={() => reject()}
            className="px-6 py-3 flex items-center gap-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <FaPhoneSlash />
            Reject
          </button>
        </>
      )}
    </div>
  );
}
