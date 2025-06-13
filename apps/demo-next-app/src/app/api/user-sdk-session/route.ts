import { CallixServerSdk } from '@callixbrasil/server-sdk';

const callixServerSdk = new CallixServerSdk(process.env.NEXT_PUBLIC_CALLIX_DOMAIN!, process.env.CALLIX_API_KEY!);

export async function POST() {
  const userSession = await callixServerSdk.createUserSessionForClientSdk(process.env.CALLIX_USERNAME || '');

  return Response.json({
    userSessionToken: userSession.userSessionToken,
  });
}
