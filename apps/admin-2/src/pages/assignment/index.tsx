import Layout from "@/components/Layout";
import { ServerAxios } from "src/utils/http";
import {
  Badge,
  Box,
  Button,
  Divider,
  Select,
  Table,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

interface IResponse {
  id: string;
  assignDate: string;
  expireDate?: string;
  isFinished: boolean;
  assignToId: string;
  lessonId: string;
  lesson: Lesson;
  assignTo: AssignTo;
}

interface Lesson {
  id: string;
  title: string;
  descripton: string;
  lastUpdated: string;
  materialsId: string[];
  teacherId: string;
  teacher: Teacher;
}

interface Teacher {
  id: string;
  userAuthId: string;
  firstname: string;
  lastname: string;
  nickname: string;
}

interface AssignTo {
  id: string;
  userAuthId: string;
  studentId: string;
  firstname: string;
  lastname: string;
  nickname: string;
  telephoneNumber: string;
  guardianTelephoneNumber: string;
}

type Props = {
  data: IResponse[];
};

const AssignmentPage: NextPage<Props> = ({ data }) => {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      queryBy: router.query.queryBy || "assignmentId",
      q: router.query.q,
    },
  });

  const queryData = async (values: typeof form.values) => {
    if (!values.q) {
      router.push(`/assignment`);
    } else {
      router.push(`/assignment?queryBy=${values.queryBy}&q=${values.q}`);
    }
  };

  const rows = data.map((d, index) => {
    const assignDateObj = new Date(d.assignDate);
    const expireDateObj = new Date(d.expireDate!);

    const assignDate = new Intl.DateTimeFormat("th-TH", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    }).format(assignDateObj);

    const assignTime = new Intl.DateTimeFormat("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(assignDateObj);

    const expireDate = new Intl.DateTimeFormat("th-TH", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    }).format(expireDateObj);

    const expireTime = new Intl.DateTimeFormat("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(expireDateObj);

    return (
      <tr key={index}>
        <td>
          {assignDate} {assignTime}
        </td>
        <td>{d.expireDate ? `${expireDate} ${expireTime}` : "ไม่มีกำหนด"}</td>
        <td>
          {d.assignTo.firstname} {d.assignTo.lastname}
          {` (${d.assignTo.nickname})`}
        </td>
        <td>{d.lesson.title}</td>
        <td>
          {!d.isFinished ? (
            <Badge color="yellow">ยังไม่เสร็จ</Badge>
          ) : (
            <Badge color="teal">เสร็จแล้ว</Badge>
          )}
        </td>
        <td>
          <Link href={`/assignment/${d.id}`}>
            <Button color="yellow">แก้ไข</Button>
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <>
      <Head>
        <title>Assignment | ระบบจัดการหลังบ้าน THE PRO TUTOR</title>
      </Head>

      <Layout>
        <Title order={2}>Assignment</Title>

        <Divider my="md" />

        <Box>
          <form
            className="flex flex-row justify-between gap-2"
            onSubmit={form.onSubmit(queryData)}
          >
            <Select
              w="auto"
              data={[
                { value: "assignmentId", label: "Assignment ID" },
                { value: "studentId", label: "รหัสนักเรียน" },
                { value: "lessonName", label: "ชื่อบทเรียน" },
              ]}
              {...form.getInputProps("queryBy")}
            />
            <TextInput
              w="100%"
              placeholder="คำค้นหา"
              {...form.getInputProps("q")}
            />
            <Button type="submit">ค้นหา</Button>
            <Button color="teal">สร้าง Assignment</Button>
          </form>
        </Box>

        <Table verticalSpacing="xs" striped mt="0.5rem">
          <thead>
            <tr>
              <th>วันสั่งงาน</th>
              <th>วันหมดอายุ</th>
              <th>ชื่อ</th>
              <th>ชื่อบทเรียน</th>
              <th>สถานะ</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
}) => {
  const { data } = await ServerAxios<IResponse[]>(`/admin/assignment`, {
    method: "GET",
    withCredentials: true,
    headers: {
      Cookie: req.headers.cookie,
    },
    validateStatus: () => true,
  });

  return {
    props: {
      data: data,
    },
  };
};

export default AssignmentPage;
