'use client';

import type { CallInteractionResult } from '@callixbrasil/client-sdk';
import {
  useCallOperatorControls,
  useCallOperatorDiscardQualifications,
  useCallOperatorSuccessQualifications,
} from '@callixbrasil/client-sdk-react';
import { useState } from 'react';

export function CallManagerAfterCall() {
  const { finishAfterCall } = useCallOperatorControls();

  const [callResult, setCallResult] = useState<CallInteractionResult>('success');
  const [qualificationId, setQualificationId] = useState<number | null>(null);

  function handleFinishAfterCall() {
    if (qualificationId != null) {
      finishAfterCall({
        result: callResult,
        qualificationId,
      });
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="bg-gray-50 p-8 rounded-lg shadow-sm text-center">
        <h2 className="text-xl font-medium mb-2">Call Ended</h2>

        <div className="flex items-center justify-center mb-4">
          <div className="mr-2">Call Result:</div>

          <div className="flex items-center gap-2">
            <ToggleButton
              label="Success"
              isEnabled={callResult === 'success'}
              enabledClasses="bg-green-500 text-white"
              disabledClasses="bg-gray-300 text-gray-700"
              onEnable={() => {
                setCallResult('success');
                setQualificationId(null);
              }}
            />
            <ToggleButton
              label="Discard"
              isEnabled={callResult === 'failure'}
              enabledClasses="bg-red-500 text-white"
              disabledClasses="bg-gray-300 text-gray-700"
              onEnable={() => {
                setCallResult('failure');
                setQualificationId(null);
              }}
            />
          </div>
        </div>

        {callResult === 'success' && <SuccessQualificationSelector onSelect={setQualificationId} />}

        {callResult === 'failure' && <DiscardQualificationSelector onSelect={setQualificationId} />}

        <button
          type="button"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={handleFinishAfterCall}
        >
          Finish After Call
        </button>
      </div>
    </div>
  );
}

function ToggleButton(props: {
  isEnabled: boolean;
  classes?: string;
  label: string;
  enabledClasses: string;
  disabledClasses: string;
  onEnable: () => void;
}) {
  return (
    <button
      type="button"
      className={`p-2 ${props.classes ?? ''} ${props.isEnabled ? props.enabledClasses : props.disabledClasses}`}
      onClick={props.isEnabled ? undefined : props.onEnable}
    >
      {props.label}
    </button>
  );
}

function Selector(props: { options: { id: number; name: string }[]; onSelect: (id: number) => void }) {
  return (
    <select
      className="w-full p-2 border border-gray-300 rounded"
      onChange={(e) => props.onSelect(Number(e.target.value))}
    >
      <option value="">-- Select Option --</option>
      {props.options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
}

function SuccessQualificationSelector(props: { onSelect: (qualificationId: number) => void }) {
  const successQualifications = useCallOperatorSuccessQualifications();

  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium mb-2">Select Qualification</h3>
      <Selector options={successQualifications} onSelect={props.onSelect} />
    </div>
  );
}

function DiscardQualificationSelector(props: { onSelect: (qualificationId: number) => void }) {
  const discardQualifications = useCallOperatorDiscardQualifications();

  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium mb-2">Select Qualification</h3>
      <Selector options={discardQualifications} onSelect={props.onSelect} />
    </div>
  );
}
