import Layout from '@/components/Layout';
import { ServerAxios } from '@/libs/http';
import { Box, Title, Divider, Code, Table, Checkbox } from '@mantine/core';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

interface IResponse {
  route: string;
  id: string;
  timestamp: string;
  userAuth: {
    email: string;
  };
}

type Props = {
  data: IResponse[];
};

const LogPage: NextPage<Props> = ({ data }) => {
  const router = useRouter();

  const toggleLoginLog = () => {
    if (router.query.q !== '/auth/signin') {
      router.push(`/logs?q=/auth/signin`);
    } else {
      router.push(`/logs`);
    }
  };

  const rows = data.map((d, index) => {
    const date = new Intl.DateTimeFormat('th-TH', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    }).format(new Date(d.timestamp));

    const time = new Intl.DateTimeFormat('th-TH', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date(d.timestamp));

    const route = d.route.length > 50 ? d.route.slice(0, 50) + '...' : d.route;

    return (
      <tr key={index}>
        <td>{date}</td>
        <td>{time}</td>
        <td>{d.userAuth.email}</td>
        <td>
          <Code>{route}</Code>
        </td>
      </tr>
    );
  });

  return (
    <>
      <Head>
        <title>Logs | ระบบจัดการหลังบ้าน THE PRO TUTOR</title>
      </Head>

      <Layout>
        <Title order={2}>ประวัติการใช้งาน</Title>

        <Divider my="md" />

        <Box className="flex flex-row justify-between gap-2">
          <Checkbox
            label="ดูประวัติการลงชื่อเข้าใช้"
            onChange={toggleLoginLog}
            checked={router.query.q === '/auth/signin'}
          />
        </Box>

        <Box>
          <Table verticalSpacing="sm">
            <thead>
              <tr>
                <th>วันที่</th>
                <th>เวลา</th>
                <th>อีเมล</th>
                <th>route</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Box>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  let responseData: IResponse[];

  if (query.q) {
    const { data } = await ServerAxios(`/admin/logs?q=${query.q}`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        Cookie: req.headers.cookie,
      },
      validateStatus: () => true,
    });

    responseData = data;
  } else {
    const { data } = await ServerAxios(`/admin/logs`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        Cookie: req.headers.cookie,
      },
      validateStatus: () => true,
    });

    responseData = data;
  }

  return {
    props: {
      data: responseData,
    },
  };
};

export default LogPage;
