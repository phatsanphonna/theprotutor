import Layout from '@/components/Layout';
import { ClientAxios, ServerAxios } from '@/libs/http';
import {
  Box,
  Button,
  Divider,
  Flex,
  Group,
  TextInput,
  Title,
  Text,
  Select,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { FileType } from '@prisma/client';
import {
  IconCheck,
} from '@tabler/icons-react';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

interface IResponseData {
  id: string;
  name: string;
  type: FileType;
  location: string;
}

type Props = {
  data: IResponseData;
};

const FileIdPage: NextPage<Props> = ({ data }) => {
  const form = useForm({
    initialValues: data,
    validateInputOnChange: true,
    validate: {},
  });

  const handleUpdateData = async (values: typeof form.values) => {
    const { data } = await ClientAxios.patch(
      `/admin/file/${values.id}`,
      {
        name: values.name,
        location: values.location,
      },
      {
        validateStatus: () => true,
      }
    );

    if (data.success) {
      notifications.show({
        message: 'อัพเดทข้อมูลสำเร็จ',
        color: 'teal',
        icon: <IconCheck />,
      });
    }
  };

  return (
    <>
      <Head>
        <title>จัดการไฟล์ | ระบบจัดการหลังบ้าน THE PRO TUTOR</title>
      </Head>

      <Layout>
        <form onSubmit={form.onSubmit(handleUpdateData)}>
          <Box className="flex flex-row gap-4">
            <Group className="flex flex-col items-start w-full">
              <Title order={2} mb="-1rem">
                แก้ไขข้อมูลไฟล์
              </Title>
              <Text>
                {data.name}
                {' / '}
                <span className="font-medium">ประเภท:</span>{' '}
                {data.type === FileType.FILE ? 'เอกสาร' : 'วิดีโอ'}
              </Text>
            </Group>

            <Flex
              direction="row"
              align="center"
              justify="center"
              gap="sm"
              className="flex-col lg:flex-row"
            >
              <a
                target='_blank'
                rel="noreferrer"
                href={`${process.env.NEXT_PUBLIC_URL}/api/file/${data.id}`}
              >
                <Button color="gray">เปิดไฟล์</Button>
              </a>
              <Button color="red">ลบไฟล์</Button>
              <Button type="submit" color="teal">
                บันทึกข้อมูล
              </Button>
            </Flex>
          </Box>

          <Divider my="md" />

          <Group className="w-full xl:w-2/4 mx-auto grid grid-cols-1 gap-4">
            <Group w="100%">
              <Title order={4} mb="-0.5rem">
                ข้อมูลเบื้องต้น
              </Title>

              <Box w="100%" display="grid" className="grid-cols-1 gap-2">
                <TextInput
                  withAsterisk
                  required={true}
                  error={form.errors}
                  label="ไอดีไฟล์"
                  type="text"
                  placeholder="ไอดีไฟล์"
                  disabled
                  {...form.getInputProps('id')}
                />

                <TextInput
                  withAsterisk
                  required={true}
                  error={form.errors}
                  label="ชื่อไฟล์"
                  type="text"
                  placeholder="ชื่อไฟล์"
                  {...form.getInputProps('name')}
                />

                <Select
                  label="ประเภทของไฟล์"
                  withAsterisk={true}
                  disabled
                  data={[
                    { label: 'วิดีโอ', value: 'VIDEO' },
                    { label: 'เอกสาร', value: 'FILE' },
                  ]}
                  {...form.getInputProps('type')}
                />

                <TextInput
                  withAsterisk
                  required={true}
                  error={form.errors}
                  label="ที่อยู่ไฟล์"
                  type="text"
                  disabled={form.values.type === FileType.FILE}
                  placeholder="ที่อยู่ไฟล์"
                  {...form.getInputProps('location')}
                />
              </Box>
            </Group>
          </Group>
        </form>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
  params,
}) => {
  const { data, status } = await ServerAxios<IResponseData>(
    `/admin/file/${params.id}`,
    {
      method: 'GET',
      withCredentials: true,
      headers: {
        Cookie: req.headers.cookie,
      },
      validateStatus: () => true,
    }
  );

  if (status === 404) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
    },
  };
};

export default FileIdPage;
