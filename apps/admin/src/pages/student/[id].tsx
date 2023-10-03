import Layout from '@/components/Layout';
import { ClientAxios, ServerAxios } from '@/libs/http';
import {
  Box,
  Button,
  Divider,
  Flex,
  Group,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

interface IResponse {
  id: string;
  userAuthId: string;
  studentId: string;
  firstname: string;
  lastname: string;
  nickname: string;
  telephoneNumber: string;
  guardianTelephoneNumber: string;
  userAuth: IResponseUserAuth;
  assignment: IResponseAssignment[];
}

interface IResponseUserAuth {
  email: string;
  isVerified: boolean;
}

interface IResponseAssignment {
  id: string;
  assignDate: string;
  expireDate: string;
  isFinished: boolean;
  lesson: IResponseLesson;
}

interface IResponseLesson {
  id: string;
  title: string;
  description?: string;
  materialsId: string[];
  teacher: IResponseTeacher;
}

interface IResponseTeacher {
  firstname: boolean;
  lastname: boolean;
  nickname: boolean;
  id: string;
}

type Props = {
  data: IResponse;
};

const StudentIdPage: NextPage<Props> = ({ data }) => {
  const form = useForm({
    initialValues: data,
    validateInputOnChange: true,
    validate: {
      telephoneNumber: (value) =>
        !/^-?\d+$/.test(value)
          ? 'โปรดกรอกตัวเลข'
          : value.length !== 10
          ? 'โปรดกรอกเบอร์โทรศัพท์ให้ครบ 10 ตัว'
          : null,
      guardianTelephoneNumber: (value) =>
        !/^-?\d+$/.test(value)
          ? 'โปรดกรอกตัวเลข'
          : value.length !== 10
          ? 'โปรดกรอกเบอร์โทรศัพท์ให้ครบ 10 ตัว'
          : null,
    },
  });

  const handleUpdateData = async (values: typeof form.values) => {
    const { data } = await ClientAxios.patch(
      `/admin/student/${values.id}`,
      {
        ...values,
        assignment: undefined,
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
        <title>จัดการนักเรียน | ระบบจัดการหลังบ้าน THE PRO TUTOR</title>
      </Head>

      <Layout>
        <form onSubmit={form.onSubmit(handleUpdateData)}>
          <Box className="flex flex-row gap-4">
            <Group className="flex flex-col items-start w-full">
              <Title order={2} mb="-1rem">
                แก้ไขข้อมูลนักเรียน
              </Title>
              <Text>
                {data.firstname} {data.lastname} ({data.nickname}) /{' '}
                <span className="font-medium">รหัสนักเรียน:</span>{' '}
                {data.studentId} / <span className="font-medium">อีเมล:</span>{' '}
                {data.userAuth.email}
              </Text>
            </Group>

            <Flex
              direction="row"
              align="center"
              justify="center"
              gap="sm"
              className="flex-col lg:flex-row"
            >
              <Button color="gray">รีเซ็ตรหัสผ่าน</Button>
              <Button color="red">ลบผู้ใช้</Button>
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
                  label="รหัสนักเรียน"
                  type="text"
                  placeholder="รหัสนักเรียน"
                  disabled
                  {...form.getInputProps('studentId')}
                />
              </Box>

              <Box w="100%" display="grid" className="grid-cols-3 gap-2">
                <TextInput
                  withAsterisk
                  required={true}
                  error={form.errors}
                  label="ชื่อจริง"
                  type="text"
                  placeholder="ชื่อจริง"
                  {...form.getInputProps('firstname')}
                />

                <TextInput
                  withAsterisk
                  required={true}
                  error={form.errors}
                  label="นามสกุล"
                  type="text"
                  placeholder="นามสกุล"
                  {...form.getInputProps('lastname')}
                />

                <TextInput
                  withAsterisk
                  required={true}
                  error={form.errors}
                  label="ชื่อเล่น"
                  type="text"
                  placeholder="ชื่อเล่น"
                  {...form.getInputProps('nickname')}
                />
              </Box>

              <Box w="100%" display="grid" className="grid-cols-1 gap-2">
                <Flex
                  w="100%"
                  direction="row"
                  className="items-end"
                  gap="0.5rem"
                >
                  <TextInput
                    withAsterisk
                    required={true}
                    error={form.errors}
                    label="อีเมล"
                    type="text"
                    placeholder="อีเมล"
                    w="100%"
                    {...form.getInputProps('userAuth.email')}
                  />
                  {!data.userAuth.isVerified && (
                    <Button variant="outline">ยืนยันอีเมล</Button>
                  )}
                </Flex>
              </Box>
            </Group>

            <Group w="100%">
              <Title order={4} mb="-0.5rem">
                เบอร์โทรศัพท์
              </Title>

              <Box w="100%" display="grid" className="grid-cols-1 gap-2">
                <Flex
                  w="100%"
                  direction="row"
                  className="items-end"
                  gap="0.5rem"
                >
                  <TextInput
                    withAsterisk
                    required={true}
                    error={form.errors}
                    label="เบอร์โทรศัพท์"
                    type="text"
                    w="100%"
                    placeholder="เบอร์โทรศัพท์"
                    {...form.getInputProps('telephoneNumber')}
                  />
                  {/* {form.values.telephoneNumber !== data.telephoneNumber
                    && <Button variant='outline'>ยืนยันเบอร์โทรศัพท์</Button>} */}
                </Flex>

                <Flex
                  w="100%"
                  direction="row"
                  className="items-end"
                  gap="0.5rem"
                >
                  <TextInput
                    withAsterisk
                    required={true}
                    error={form.errors}
                    label="เบอร์โทรศัพท์ผู้ปกครอง"
                    w="100%"
                    type="text"
                    placeholder="เบอร์โทรศัพท์ผู้ปกครอง"
                    {...form.getInputProps('guardianTelephoneNumber')}
                  />
                </Flex>
              </Box>
            </Group>
          </Group>
        </form>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
  req,
}) => {
  const { data, status } = await ServerAxios<IResponse>(
    `/admin/student/${params?.id}`,
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

export default StudentIdPage;
