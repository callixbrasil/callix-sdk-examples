'use client';

import {
  useCallOperatorBreaks,
  useCallOperatorControls,
  useCallOperatorCurrentBreak,
  useCallOperatorState
} from '@callixbrasil/client-sdk-react';
import { useState } from 'react';

const BECOME_AVAILABLE_FROM = ['offline', 'onBreak', 'clickToCall', 'manualCall'];
const ENTER_ON_BREAK_FROM = ['idle', 'offline'];

const STATUS_STYLES: Record<string, string> = {
  starting: 'bg-blue-100 text-blue-800',
  idle: 'bg-green-100 text-green-800',
  onBreak: 'bg-amber-100 text-amber-800',
  offline: 'bg-red-100 text-red-800',
  error: 'bg-red-100 text-red-800',
};

export function StatusPanel() {
  const { becomeAvailable, goOffline, enterOnBreak } = useCallOperatorControls();
  const breaks = useCallOperatorBreaks();
  const callOperatorState = useCallOperatorState();
  const currentBreak = useCallOperatorCurrentBreak();

  const [selectedBreakId, setSelectedBreakId] = useState<number | null>(null);

  const state = callOperatorState?.state ?? 'unknown';

  const breakId = selectedBreakId ?? breaks[0]?.id ?? null;

  const canBecomeAvailable = BECOME_AVAILABLE_FROM.includes(state);
  const canEnterOnBreak = ENTER_ON_BREAK_FROM.includes(state) && breakId != null;
  const canGoOffline = state !== 'offline';

  return (
    <section className="bg-white shadow-sm rounded-lg p-6 mb-8 space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-medium">Operator Status</h2>
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-1 rounded text-sm font-medium ${STATUS_STYLES[state] ?? 'bg-gray-100 text-gray-800'}`}
          >
            {state}
          </span>
        </div>
      </header>

      {currentBreak && (
        <p className="text-sm text-gray-600">
          Current break: {currentBreak.name} ({currentBreak.id})
        </p>
      )}

      <div className="flex flex-wrap items-end gap-3">
        <button
          type="button"
          onClick={() => becomeAvailable()}
          disabled={!canBecomeAvailable}
          title={canBecomeAvailable ? undefined : `becomeAvailable() is not accepted in "${state}"`}
          className="px-4 py-2 rounded-md bg-green-600 text-white font-medium hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Become Available
        </button>

        <button
          type="button"
          onClick={() => goOffline()}
          disabled={!canGoOffline}
          title={canGoOffline ? undefined : 'Already offline'}
          className="px-4 py-2 rounded-md bg-red-600 text-white font-medium hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Go Offline
        </button>

        <div className="flex items-end gap-2">
          <div>
            <label htmlFor="status-panel-break" className="block text-sm font-medium text-gray-700 mb-1">
              Break
            </label>
            <select
              id="status-panel-break"
              value={breakId ?? ''}
              onChange={(e) => setSelectedBreakId(Number(e.target.value))}
              disabled={breaks.length === 0}
              className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {breaks.length === 0 && <option value="">No breaks available</option>}
              {breaks.map((serviceBreak) => (
                <option key={serviceBreak.id} value={serviceBreak.id}>
                  {serviceBreak.name} ({serviceBreak.id})
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() => breakId != null && enterOnBreak(breakId)}
            disabled={!canEnterOnBreak}
            title={canEnterOnBreak ? undefined : `ENTER_ON_BREAK is not accepted in "${state}"`}
            className="px-4 py-2 rounded-md bg-amber-600 text-white font-medium hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Enter Break
          </button>
        </div>
      </div>
    </section>
  );
}
