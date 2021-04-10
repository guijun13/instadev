import React from 'react';
import authService from '../../src/components/services/auth/authService';

export default function ProfilePage() {
  return (
    <>
      Página de profile
      <img
        src="https://media.giphy.com/media/bn0zlGb4LOyo8/giphy.gif"
        alt="Nicolas Cage"
      />
    </>
  );
}

export async function getServerSideProps(context) {
  const auth = await authService(context);

  const hasActiveSession = auth.hasActiveSession();

  if (hasActiveSession) {
    const session = await auth.getSession();
    return {
      props: {
        user: session,
      },
    };
  }

  context.res.writeHead(307, { location: '/login' });
  context.res.end();

  return {
    props: {},
  };
}
