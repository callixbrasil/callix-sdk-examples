'use client';

import { useCallOperatorStartupError } from '@callixbrasil/client-sdk-react';

const MESSAGES = {
  missingAudioPermissions: 'Please allow microphone access to start taking calls.',
  maxUsersReached: 'The maximum number of simultaneous users has been reached.',
  userIsAlreadyConnectedOnAnotherDevice: 'You are already available on another device.',
  unknownError: 'Could not start the call operator.',
};

export function StartupErrorMessage() {
  const startupError = useCallOperatorStartupError();

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="bg-red-50 p-8 rounded-lg shadow-sm text-center">
        <h2 className="text-xl font-medium mb-2">Startup Error</h2>
        <p className="text-gray-600">{startupError ? MESSAGES[startupError] : MESSAGES.unknownError}</p>
      </div>
    </div>
  );
}
