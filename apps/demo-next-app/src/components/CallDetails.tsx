'use client';
import type { Call } from '@callixbrasil/client-sdk';

interface CallDetailsProps {
  call: Call | null;
}

export function CallDetails({ call }: CallDetailsProps) {
  if (!call) {
    return null;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-2">Call Details</h3>
      <div className="space-y-2">
        <p className="flex justify-between">
          <span className="font-medium">Call ID:</span>
          <span className="text-xs">{call.id}</span>
        </p>
        {call.data.callUuid && (
          <p className="flex justify-between">
            <span className="font-medium">UUID:</span>
            <span className="text-xs">{call.data.callUuid}</span>
          </p>
        )}
        {call.data.protocol && (
          <p className="flex justify-between">
            <span className="font-medium">Protocol:</span>
            <span className="text-xs">{call.data.protocol}</span>
          </p>
        )}
      </div>
    </div>
  );
}
