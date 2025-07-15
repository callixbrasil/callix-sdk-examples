'use client';
import { useCallOperatorControls, useCallOperatorState } from '@callixbrasil/client-sdk-react';
import { AudioControls } from './AudioControls';
import { CallButtons } from './CallButtons';
import { CallDetails } from './CallDetails';
import { CallInfoDisplay } from './CallInfoDisplay';
import { CallTimer } from './CallTimer';
import { RingingAnimation } from './RingingAnimation';

export function CallManager() {
  const callOperatorState = useCallOperatorState();
  const { finishAfterCall } = useCallOperatorControls();

  console.log('callOperatorState', callOperatorState);

  if (!callOperatorState) {
    return null;
  }

  if (callOperatorState.state === 'starting') {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="bg-gray-50 p-8 rounded-lg shadow-sm text-center">
          <h2 className="text-xl font-medium mb-2">Initializing Call Operator</h2>
          <p className="text-gray-600">Please wait...</p>
        </div>
      </div>
    );
  }

  if (callOperatorState.state === 'idle') {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="bg-gray-50 p-8 rounded-lg shadow-sm text-center">
          <h2 className="text-xl font-medium mb-2">No Active Call</h2>
          <p className="text-gray-600">Waiting for incoming calls...</p>
        </div>
      </div>
    );
  }

  if (callOperatorState.state === 'onBreak') {
    const serviceBreak = callOperatorState.break;

    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="bg-gray-50 p-8 rounded-lg shadow-sm text-center">
          <h2 className="text-xl font-medium mb-2">On Break</h2>
          <p className="text-gray-600">You are currently on break.</p>
          <p className="text-gray-600">
            Break: {serviceBreak.name} ({serviceBreak.id})
          </p>
        </div>
      </div>
    );
  }

  if (callOperatorState.state === 'callRinging') {
    return (
      <div className="flex flex-col gap-6 w-full max-w-lg mx-auto p-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-600 text-white p-4">
            <h2 className="text-xl font-semibold text-center">Incoming Call</h2>
          </div>

          <div className="p-6 space-y-6">
            {/* Ringing animation */}
            <RingingAnimation />

            {/* Call control buttons */}
            <CallButtons isConnected={false} />

            {/* Call info section */}
            <CallDetails call={callOperatorState.call} />
          </div>
        </div>
      </div>
    );
  }

  if (callOperatorState.state === 'callInProgress') {
    return (
      <div className="flex flex-col gap-6 w-full max-w-lg mx-auto p-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-600 text-white p-4">
            <h2 className="text-xl font-semibold text-center">Call in Progress</h2>
          </div>

          <div className="p-6 space-y-6">
            {/* Call timer (only show when connected) */}
            <CallTimer call={callOperatorState.call} />

            {/* Call control buttons */}
            <CallButtons isConnected />

            {/* Audio controls (only show when connected) */}
            <AudioControls />

            {/* Basic call info section */}
            <CallDetails call={callOperatorState.call} />

            {/* Call info using the new component - handles all call types */}
            <CallInfoDisplay />
          </div>
        </div>
      </div>
    );
  }

  if (callOperatorState.state === 'afterCall') {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="bg-gray-50 p-8 rounded-lg shadow-sm text-center">
          <h2 className="text-xl font-medium mb-2">Call Ended</h2>
          
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={finishAfterCall}
          >
            Finish After Call
          </button>
        </div>
      </div>
    );
  }

  if (callOperatorState.state === 'error') {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="bg-red-50 p-8 rounded-lg shadow-sm text-center">
          <h2 className="text-xl font-medium mb-2">Error</h2>
        </div>
      </div>
    );
  }

  if (callOperatorState.state === 'offline') {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="bg-gray-50 p-8 rounded-lg shadow-sm text-center">
          <h2 className="text-xl font-medium mb-2">Offline</h2>
          <p className="text-gray-600">You are currently offline. Please check your connection.</p>
        </div>
      </div>
    );
  }
}
