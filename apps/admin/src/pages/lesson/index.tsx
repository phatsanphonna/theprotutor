import Layout from "@/components/Layout";
import { copyToClipboard } from "@/libs/clipboard";
import { ServerAxios } from "@/libs/http";
import {
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
  title: string;
  description: string;
  lastUpdated: string;
  materialsId: string[];
  teacherId: string;
  teacher: ITeacherResponse;
}

interface ITeacherResponse {
  id: string;
  userAuthId: string;
  firstname: string;
  lastname: string;
  nickname: string;
}

type Props = {
  data: IResponse[];
};

const LessonPage: NextPage<Props> = ({ data }) => {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      queryBy: router.query.queryBy || "lessonId",
      q: router.query.q,
    },
  });

  const queryData = async (values: typeof form.values) => {
    if (!values.q) {
      router.push(`/lesson`);
    } else {
      router.push(`/lesson?queryBy=${values.queryBy}&q=${values.q}`);
    }
  };

  const rows = data.map((d, index) => {
    const date = new Intl.DateTimeFormat("th-TH", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    }).format(new Date(d.lastUpdated));

    const time = new Intl.DateTimeFormat("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(new Date(d.lastUpdated));

    return (
      <tr key={index}>
        <td
          onClick={async () => await copyToClipboard(d.id)}
          className="hover:underline cursor-pointer"
        >
          {d.id}
        </td>
        <td>{d.title}</td>
        <td>
          {d.teacher.firstname} {d.teacher.lastname}{" "}
          {d.teacher.nickname && `(${d.teacher.nickname})`}
        </td>
        <td>
          {date} {time}
        </td>
        <td>
          <Link href={`/lesson/${d.id}`}>
            <Button color="yellow">แก้ไข</Button>
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <>
      <Head>
        <title>บทเรียน | ระบบจัดการหลังบ้าน THE PRO TUTOR</title>
      </Head>

      <Layout>
        <Title order={2}>บทเรียน</Title>

        <Divider my="md" />

        <Box>
          <form
            className="flex flex-row justify-between gap-2"
            onSubmit={form.onSubmit(queryData)}
          >
            <Select
              data={[
                { value: "lessonId", label: "รหัสบทเรียน" },
                { value: "name", label: "ชื่อบทเรียน" },
              ]}
              {...form.getInputProps("queryBy")}
            />
            <TextInput
              w="100%"
              placeholder="คำค้นหา"
              {...form.getInputProps("q")}
            />
            <Button type="submit">ค้นหา</Button>
            <Link href="/lesson/new">
              <Button color="teal">สร้างบทเรียน</Button>
            </Link>
          </form>
        </Box>

        <Table verticalSpacing="xs" striped mt="0.5rem">
          <thead>
            <tr>
              <th>รหัสบทเรียน</th>
              <th>ชื่อ</th>
              <th>ชื่อผู้สอน</th>
              <th>อัพเดทล่าสุด</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { data } = await ServerAxios<IResponse[]>(`/admin/lesson`, {
    method: "GET",
    withCredentials: true,
    headers: {
      Cookie: req.headers.cookie,
    },
    validateStatus: () => true,
  });

  return {
    props: {
      data,
    },
  };
};

export default LessonPage;
