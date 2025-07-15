'use client';
import { CallixClientProvider } from '@callixbrasil/client-sdk-react';
import { useQuery } from '@tanstack/react-query';
import { CallManager } from '../components/CallManager';

export default function Home() {
  const queryUserSdkSession = useQuery({
    queryKey: ['user-sdk-session'],
    queryFn: async () => {
      const response = await fetch('/api/user-sdk-session', {
        method: 'POST',
        body: JSON.stringify({}),
      });

      return (await response.json()) as {
        userSessionToken: string;
      };
    },
    staleTime: Infinity,
  });

  const session = queryUserSdkSession.data;

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
          <p>Please wait while we set up your session.</p>
        </div>
      </div>
    );
  }

  return (
    <CallixClientProvider
      domain={process.env.NEXT_PUBLIC_CALLIX_DOMAIN || ''}
      userSessionToken={session.userSessionToken}
    >
      <PageContent />
    </CallixClientProvider>
  );
}

function PageContent() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Callix SDK Demo</h1>
        </header>

        <main>
          <CallManager />
        </main>
      </div>
    </div>
  );
}
