'use client';

import { useCallOperatorAudioOutputMuted, useCallOperatorAudioOutputVolume } from '@callixbrasil/client-sdk-react';
import { useCallOperatorAudioInputMuted } from '@callixbrasil/client-sdk-react/src/modules/callOperator';
import { FaMicrophone, FaMicrophoneSlash, FaVolumeDown, FaVolumeMute, FaVolumeOff, FaVolumeUp } from 'react-icons/fa';

export function AudioControls() {
  return (
    <div className="flex gap-4 w-full max-w-md mx-auto mt-4 ">
      <AudioInputControls />
      <AudioOutputControls />
    </div>
  );
}

function AudioInputControls() {
  const [isMuted, setMute] = useCallOperatorAudioInputMuted();

  function toggleMute() {
    setMute(!isMuted);
  }

  return (
    <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg">
      <button
        type="button"
        onClick={toggleMute}
        className={`p-3 rounded-full ${isMuted ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? <FaMicrophoneSlash className="h-6 w-6" /> : <FaMicrophone className="h-6 w-6" />}
      </button>
    </div>
  );
}

function AudioOutputControls() {
  const [isMuted, setMute] = useCallOperatorAudioOutputMuted();
  const [volume, setVolume] = useCallOperatorAudioOutputVolume();

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const toggleMute = () => {
    setMute(!isMuted);
  };
  return (
    <div className="flex items-center w-full gap-4 p-4 bg-gray-100 rounded-lg">
      <button
        type="button"
        onClick={toggleMute}
        className={`p-3 rounded-full ${isMuted ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? (
          <FaVolumeMute className="h-6 w-6" />
        ) : volume > 0.5 ? (
          <FaVolumeUp className="h-6 w-6" />
        ) : volume > 0 ? (
          <FaVolumeDown className="h-6 w-6" />
        ) : (
          <FaVolumeOff className="h-6 w-6" />
        )}
      </button>
      <div className="flex-1">
        <label htmlFor="output-volume-control" className="block text-sm font-medium mb-1">
          Output: {Math.round(volume * 100)}%
        </label>
        <input
          type="range"
          id="output-volume-control"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-full"
        />
      </div>
    </div>
  );
}
