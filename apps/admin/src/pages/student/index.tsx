import Layout from "@/components/Layout";
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
import { copyToClipboard } from "@/libs/clipboard";
import { IconCsv } from "@tabler/icons-react";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

interface IResponse {
  userAuth: {
    email: string;
    isVerified: boolean;
  };
  id: string;
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
      queryBy: router.query.queryBy || "email",
      q: router.query.q,
    },
  });

  const queryData = async (values: typeof form.values) => {
    if (!values.q) {
      router.push(`/student`);
    } else {
      router.push(`/student?queryBy=${values.queryBy}&q=${values.q}`);
    }
  };

  const exportCSV = () => {
    const exported = data.map((student) => [
      student.studentId,
      student.userAuth.email,
      student.firstname,
      student.lastname,
      student.nickname,
    ]);

    exported.unshift([
      "studentId",
      "email",
      "firstname",
      "lastname",
      "nickname",
    ]);

    const csvContent =
      `data:text/csv;charset=utf-8,` +
      exported.map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  };

  const rows = data.map((d, index) => {
    const telNum = d.telephoneNumber;

    return (
      <tr key={index}>
        <td
          onClick={async () => await copyToClipboard(d.studentId)}
          className="hover:underline cursor-pointer"
        >
          {d.studentId}
        </td>
        <td>
          {d.firstname} {d.lastname}
        </td>
        <td>{d.nickname}</td>
        <td>{d.userAuth.email}</td>
        <td onCopy={() => navigator.clipboard.writeText(telNum)}>
          {telNum.slice(0, 3)} {telNum.slice(3, 6)} {telNum.slice(6)}
        </td>
        <td>
          <Link href={`/student/${d.id}`}>
            <Button color="yellow">แก้ไข</Button>
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <>
      <Head>
        <title>นักเรียน | ระบบจัดการหลังบ้าน THE PRO TUTOR</title>
      </Head>

      <Layout>
        <Title order={2}>นักเรียน</Title>

        <Divider my="md" />

        <Box>
          <form
            className="flex flex-row justify-between gap-2"
            onSubmit={form.onSubmit(queryData)}
          >
            <Select
              data={[
                { value: "email", label: "อีเมล" },
                { value: "studentId", label: "รหัสนักเรียน" },
                { value: "telephoneNumber", label: "เบอร์โทรศัพท์" },
                { value: "firstname", label: "ชื่อจริง" },
                { value: "nickname", label: "ชื่อเล่น" },
              ]}
              {...form.getInputProps("queryBy")}
            />
            <TextInput
              w="100%"
              placeholder="คำค้นหา"
              {...form.getInputProps("q")}
            />
            <Button type="submit">ค้นหา</Button>
            <Button variant="outline" onClick={exportCSV}>
              <IconCsv />
            </Button>
          </form>
        </Box>

        <Table verticalSpacing="xs" striped mt="0.5rem">
          <thead>
            <tr>
              <th>รหัสนักเรียน</th>
              <th>ชื่อ-นามสกุล</th>
              <th>ชื่อเล่น</th>
              <th>อีเมล</th>
              <th>เบอร์โทรศัพท์</th>
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
  query,
}) => {
  let responseData: IResponse[];

  if (query.queryBy && query.q) {
    const { data } = await ServerAxios<IResponse[]>(
      `/admin/student?q=${query.q}&queryBy=${query.queryBy}`,
      {
        method: "GET",
        withCredentials: true,
        headers: {
          Cookie: req.headers.cookie,
        },
        validateStatus: () => true,
      },
    );

    responseData = data;
  } else {
    const { data } = await ServerAxios<IResponse[]>("/admin/student", {
      method: "GET",
      withCredentials: true,
      headers: {
        Cookie: req.headers.cookie,
      },
      validateStatus: () => true,
    });

    responseData = data;
  }

  return {
    props: { data: responseData },
  };
};

export default AssignmentPage;
