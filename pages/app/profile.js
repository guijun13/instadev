import React from 'react';
import { authService } from '../../src/components/services/auth/authService';
import { useUserService } from '../../src/components/services/user/hooks';
import { userService } from '../../src/components/services/user/userService';

export default function ProfilePage() {
  const data = useUserService.getProfilePage();

  console.log(data);
  return (
    <>
      Página de profile
      <img
        src="https://media.giphy.com/media/bn0zlGb4LOyo8/giphy.gif"
        alt="Nicolas Cage"
      />
      {/* <pre>{JSON.stringify(props, null, 4)}</pre> */}
    </>
  );
}

export async function getServerSideProps(context) {
  const auth = await authService(context);

  const hasActiveSession = auth.hasActiveSession();

  if (hasActiveSession) {
    const session = await auth.getSession();
    const profilePage = await userService.getProfilePage(context);
    return {
      props: {
        user: {
          ...session,
          ...profilePage.user,
        },
        posts: profilePage.posts,
      },
    };
  }

  context.res.writeHead(307, { location: '/login' });
  context.res.end();

  return {
    props: {},
  };
}
