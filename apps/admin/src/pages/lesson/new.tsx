import FileQuery from '@/components/FileQuery';
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
  Textarea,
  Select,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { File, FileType, Teacher } from '@prisma/client';
import {
  IconBrandVimeo,
  IconCheck,
  IconFile,
  IconX,
} from '@tabler/icons-react';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface IResponseData {
  id: string;
  title: string;
  description: string;
  lastUpdated: string;
  materialsId: string[];
  teacherId: string;
  teacher: IResponseTeacher;
  materials: IResponseMaterial[];
}

interface IResponseTeacher {
  firstname: string;
  lastname: string;
  nickname?: string;
}

interface IResponseMaterial {
  id: string;
  name: string;
  type: FileType;
  location: string;
}

type Props = {
  teachers: Teacher[];
};

const NewLessonPage: NextPage<Props> = ({ teachers }) => {
  const router = useRouter()

  const [totalFiles, setTotalFiles] = useState(0)
  const [ping, doPing] = useState(0);

  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      materials: [],
      materialsId: [],
      teacherId: '',
      teacher: {}
    } as IResponseData,
    validateInputOnChange: true,
    validate: {},
  });

  const deleteFile = (fileId: string) => {
    form.values.materials = form.values.materials.filter(
      (file) => file.id !== fileId
    );

    setTotalFiles(form.values.materials.length);
  };

  const handleSelectFile = (file: File) => {
    if (form.values.materials.find(m => m.id === file.id)) {
      return;
    }

    form.values.materials = [...form.values.materials, file];

    setTotalFiles(form.values.materials.length);
  };

  const handleCreateData = async (values: typeof form.values) => {
    const materialsId = values.materials.map((value) => value.id)

    const { data, status } = await ClientAxios.post(
      `/admin/lesson`,
      {
        ...values,
        materialsId,
        lastUpdated: new Date().toISOString(),
        teacher: undefined,
        materials: undefined,
        id: undefined,
      },
      {
        validateStatus: () => true,
      }
    );

    if (status === 201) {
      notifications.show({
        message: 'สร้างบทเรียนใหม่เรียบร้อย',
        color: 'teal',
        icon: <IconCheck />,
      });

      router.push(`/lesson/${data.id}`)
    }
  };

  return (
    <>
      <Head>
        <title>สร้างบทเรียน | ระบบจัดการหลังบ้าน THE PRO TUTOR</title>
      </Head>

      <Layout>
        <FileQuery toggle={ping} onSelect={handleSelectFile} />

        <form onSubmit={form.onSubmit(handleCreateData)}>
          <Box className="flex flex-row gap-4">
            <Group className="flex flex-col items-start w-full">
              <Title order={2} mb="-1rem">
                สร้างบทเรียนใหม่
              </Title>
            </Group>

            <Flex
              direction="row"
              align="center"
              justify="center"
              gap="sm"
              className="flex-col lg:flex-row"
            >
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
                  label="ชื่อบทเรียน"
                  type="text"
                  placeholder="ชื่อบทเรียน"
                  {...form.getInputProps('title')}
                />

                <Select
                  label="ผู้สอน"
                  withAsterisk={true}
                  data={teachers.map((teacher) => ({
                    value: teacher.id,
                    label: `${teacher.firstname} ${teacher.lastname}`,
                  }))}
                  {...form.getInputProps('teacherId')}
                />

                <Textarea
                  error={form.errors}
                  label="คำอธิบายบทเรียน"
                  placeholder="คำอธิบายบทเรียน"
                  minRows={10}
                  maxRows={15}
                  {...form.getInputProps('description')}
                />
              </Box>
            </Group>

            <Group w="100%">
              <Title order={4} mb="-0.5rem">
                ไฟล์ {totalFiles > 0 && `(${totalFiles} ไฟล์)`}
              </Title>

              <Box w="100%" display="grid" className="grid-cols-1 gap-2">
                <Button onClick={() => doPing(ping + 1)}>เพิ่มไฟล์</Button>
                {form.values.materials.map((file, index) => (
                  <Box
                    key={index}
                    h="3rem"
                    w="100%"
                    display="flex"
                    className="shadow rounded outline outline-1 outline-gray-300 flex flex-row justify-between- items-center"
                    p="sm"
                  >
                    <Text className="h-full w-full flex flex-row justify-start items-center gap-2">
                      {file.type === 'FILE' ? <IconFile /> : <IconBrandVimeo />}
                      <span>{file.name}</span>
                    </Text>
                    <IconX color="red" onClick={() => deleteFile(file.id)} />
                  </Box>
                ))}
              </Box>
            </Group>
          </Group>
        </form>
        <></>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
}) => {
  const { data: teachers, status: tStatus } = await ServerAxios<Teacher[]>(
    `/admin/teacher`,
    {
      method: 'GET',
      withCredentials: true,
      headers: {
        Cookie: req.headers.cookie,
      },
      validateStatus: () => true,
    }
  );

  if (tStatus == 404) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      teachers,
    },
  };
};

export default NewLessonPage;
