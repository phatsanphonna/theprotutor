import { ServerAxios } from '@/libs/http';
import {
  Button,
  Center,
  Container,
  Text
} from '@mantine/core';
import { Role } from 'database';
import {
  IconBrandGoogle
} from '@tabler/icons-react';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

const SignInPage: NextPage = () => {
  const handleSignIn = async () => {
    window.open(`/api/auth/signin/google?redirectUrl=http://localhost:7810/api/auth/callback`,"_self")
  };

  return (
    <>
      <Head>
        <title>เข้าสู่ระบบ | ระบบจัดการหลังบ้าน THE PRO TUTOR</title>
      </Head>

      <Container className="grid place-items-center h-full min-h-screen">
        <Center className="flex flex-col gap-4">
          <Text className="text-2xl font-bold">
            ระบบจัดการหลังบ้าน THE PRO TUTOR
          </Text>

          <Button
            color="blue"
            opacity={100}
            onClick={handleSignIn}
            leftIcon={<IconBrandGoogle size='1rem' />}
          >
            เข้าสู่ระบบด้วย Google
          </Button>
        </Center>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const { data } = await ServerAxios<{ status: boolean; roles: Role[] }>(
      '/auth/verify',
      {
        method: 'POST',
        withCredentials: true,
        headers: {
          Cookie: req.headers.cookie,
        },
        validateStatus: () => true,
      }
    );

    if (data.status && data.roles.includes(Role.ADMIN)) {
      return {
        redirect: {
          destination: '/',
          permanent: true,
        },
      };
    }
  } catch ({ response }) {
    return {
      props: {},
    };
  }

  return {
    props: {},
  };
};
export default SignInPage;
