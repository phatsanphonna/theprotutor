import Layout from "@/components/Layout";
import { ClientAxios, ServerAxios } from "@/libs/http";
import {
  Box,
  Button,
  Divider,
  Flex,
  Group,
  TextInput,
  Title,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { DateTimePicker } from "@mantine/dates";
import { IconCheck } from "@tabler/icons-react";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

export interface IResponseData {
  id: string;
  assignDate: string;
  expireDate?: string;
  isFinished: boolean;
  assignToId: string;
  lessonId: string;
  assignTo: AssignTo;
  lesson: Lesson;
}

export interface AssignTo {
  id: string;
  studentId: string;
  firstname: string;
  lastname: string;
  nickname: string;
}

export interface Lesson {
  id: string;
  title: string;
  descripton: string;
  lastUpdated: string;
  materialsId: string[];
  teacherId: string;
  teacher: Teacher;
  materials: Material[];
}

export interface Teacher {
  firstname: string;
  lastname: string;
  nickname: string;
  id: string;
}

export interface Material {
  id: string;
  name: string;
  type: string;
  location: string;
}

type Props = {
  data: IResponseData;
};

const LessonIdPage: NextPage<Props> = ({ data }) => {
  const [expired, setExpired] = useState(data.expireDate == null);

  const form = useForm({
    initialValues: {
      ...data,
      assignDate: new Date() as Date | null,
      expireDate: new Date() as Date | null,
    },
    validateInputOnChange: true,
    validate: {},
  });

  const toggleExpired = () => {
    setExpired((expired) => !expired);

    if (!expired) {
      form.values.expireDate = null;
    } else {
      const date = new Date();
      date.setDate(new Date().getDate() + 1);

      form.values.expireDate = date;
    }
  };

  const handleUpdateData = async (values: typeof form.values) => {
    const { data } = await ClientAxios.patch(
      `/admin/assignment/${values.id}`,
      {
        ...values,
        lastUpdated: new Date().toISOString(),
        teacher: undefined,
        materials: undefined,
        id: undefined,
      },
      {
        validateStatus: () => true,
      },
    );

    if (data.success) {
      notifications.show({
        message: "อัพเดทข้อมูลสำเร็จ",
        color: "teal",
        icon: <IconCheck />,
      });
    }
  };

  return (
    <>
      <Head>
        <title>จัดการ Assignment | ระบบจัดการหลังบ้าน THE PRO TUTOR</title>
      </Head>

      <Layout>
        <form onSubmit={form.onSubmit(handleUpdateData)}>
          <Box className="flex flex-row gap-4">
            <Group className="flex flex-col items-start w-full">
              <Title order={2} mb="-1rem">
                แก้ไข Assignment
              </Title>
              <Text>
                {data.assignTo.firstname} {data.assignTo.lastname}
                {" / "}
                <span className="font-medium">ชื่อบทเรียน:</span>{" "}
                {data.lesson.title} /{" "}
                <span className="font-medium">ชื่อผู้สอน:</span>{" "}
                {data.lesson.teacher.firstname} {data.lesson.teacher.lastname}{" "}
                {data.lesson.teacher.nickname &&
                  `(${data.lesson.teacher.nickname})`}
              </Text>
            </Group>

            <Flex
              direction="row"
              align="center"
              justify="center"
              gap="sm"
              className="flex-col lg:flex-row"
            >
              <Button color="red">ลบ Assignment</Button>
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
                  label="Assignment ID"
                  type="text"
                  placeholder="Assignment ID"
                  disabled
                  {...form.getInputProps("id")}
                />

                <TextInput
                  withAsterisk
                  required={true}
                  error={form.errors}
                  label="ชื่อบทเรียน"
                  type="text"
                  placeholder="ชื่อบทเรียน"
                  disabled
                  {...form.getInputProps("lesson.title")}
                />
                <TextInput
                  withAsterisk
                  required={true}
                  label="ชื่อผู้สอน"
                  type="text"
                  placeholder="ชื่อผู้สอน"
                  disabled
                  defaultValue={`${form.values.lesson.teacher.firstname} ${form.values.lesson.teacher.lastname}`}
                />
              </Box>

              <Box w="100%" display="grid" className="grid-cols-2 gap-2">
                <DateTimePicker
                  withAsterisk
                  required={true}
                  label="วันที่สั่ง assignment"
                  placeholder="วันที่สั่ง assignment"
                  onChange={(e) => (form.values.assignDate = e)}
                  defaultValue={new Date(data.assignDate)}
                  disabled
                />

                <Flex className="flex-row items-end gap-1">
                  <DateTimePicker
                    withAsterisk
                    required={true}
                    label="วันที่หมดอายุ"
                    placeholder="ไม่มีวันหมดอายุ"
                    disabled={expired}
                    onChange={(e) => (form.values.expireDate = e)}
                    defaultValue={new Date(data.expireDate!)}
                    value={form.values.expireDate}
                    w="100%"
                  />
                  <Button
                    onClick={toggleExpired}
                    color={!expired ? "red" : "yellow"}
                  >
                    {expired ? "ไม่มีวันหมดอายุ" : "หมดอายุ"}
                  </Button>
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
  req,
  params,
}) => {
  const { data, status } = await ServerAxios<IResponseData>(
    `/admin/assignment/${params?.id}`,
    {
      method: "GET",
      withCredentials: true,
      headers: {
        Cookie: req.headers.cookie,
      },
      validateStatus: () => true,
    },
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

export default LessonIdPage;
