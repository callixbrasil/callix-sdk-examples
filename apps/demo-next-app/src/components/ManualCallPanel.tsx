'use client';

import { useCallOperator, useCallOperatorState } from '@callixbrasil/client-sdk-react';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { useCallback, useEffect, useState } from 'react';

const validatePhoneNumber = (phoneNumber: string) => {
  if (!phoneNumber) {
    return 'Phone number is required';
  }

  const isValid = isValidPhoneNumber(phoneNumber, 'BR');
  if (!isValid) {
    return 'Invalid phone number';
  }

  return null;
};

/**
 * Panel that allows the operator to place a manual outbound call when idle.
 */
export function ManualCallPanel() {
  const callOperator = useCallOperator();
  const operatorState = useCallOperatorState();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isCalling, setIsCalling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Clear input after we leave idle (call ringing or in progress)
  useEffect(() => {
    if (operatorState?.state === 'callRinging' || operatorState?.state === 'callInProgress') {
      setIsCalling(false);
      setPhoneNumber('');
    }
  }, [operatorState?.state]);

  const handleCall = useCallback(() => {
    const phoneNumberTrimmed = phoneNumber.trim();
    const err = validatePhoneNumber(phoneNumberTrimmed);

    setError(err);

    if (err) {
      return;
    }

    try {
      setIsCalling(true);
      callOperator.makeManualCall(phoneNumberTrimmed);
    } catch (e) {
      console.error(e);
      setError('Failed to start call');
      setIsCalling(false);
    }
  }, [phoneNumber, callOperator]);

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="manual-call-number" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          id="manual-call-number"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="e.g. +5511999999999"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
            if (error) setError(null);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleCall();
            }
          }}
          disabled={isCalling}
        />
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
      <button
        type="button"
        onClick={handleCall}
        disabled={isCalling || !!validatePhoneNumber(phoneNumber)}
        className="w-full flex justify-center items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isCalling ? 'Calling...' : 'Call'}
      </button>
    </div>
  );
}
