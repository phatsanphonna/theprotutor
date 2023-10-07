import Layout from "@/components/Layout";
import { copyToClipboard } from "@/libs/clipboard";
import { ServerAxios } from "@/libs/http";
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
import { File } from "database";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  data: File[];
};

const FilePage: NextPage<Props> = ({ data }) => {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      queryBy: router.query.queryBy || "id",
      q: router.query.q,
    },
  });

  const queryData = async (values: typeof form.values) => {
    if (!values.q) {
      router.push(`/file`);
    } else {
      router.push(`/file?queryBy=${values.queryBy}&q=${values.q}`);
    }
  };

  const handleShare = async (id: string) => {
    await copyToClipboard(`${process.env.NEXT_PUBLIC_URL}/api/file/${id}`);
  };

  const rows = data.map((d, index) => {
    return (
      <tr key={index}>
        <td
          onClick={async () => await copyToClipboard(d.id)}
          className="hover:underline cursor-pointer"
        >
          {d.id}
        </td>
        <td>{d.name}</td>
        <td>
          {d.type === "FILE" ? (
            <Badge color="orange">ไฟล์</Badge>
          ) : (
            <Badge color="indigo">วีดีโอ</Badge>
          )}
        </td>
        <td className="flex flex-row gap-2">
          <Link href={`/file/${d.id}`}>
            <Button color="yellow">แก้ไข</Button>
          </Link>
          {d.type === "FILE" && (
            <a
              target="_blank"
              rel="noreferrer"
              href={`${process.env.NEXT_PUBLIC_URL}/api/file/${d.id}`}
            >
              <Button>เปิดไฟล์</Button>
            </a>
          )}
          <Button color="gray" onClick={async () => handleShare(d.id)}>
            แชร์
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <Head>
        <title>ไฟล์ | ระบบจัดการหลังบ้าน THE PRO TUTOR</title>
      </Head>

      <Layout>
        <Title order={2}>ไฟล์</Title>

        <Divider my="md" />

        <Box>
          <form
            className="flex flex-row justify-between gap-2"
            onSubmit={form.onSubmit(queryData)}
          >
            <Select
              data={[
                { value: "id", label: "ไอดีไฟล์" },
                { value: "location", label: "ที่อยู่ไฟล์" },
                { value: "name", label: "ชื่อไฟล์" },
              ]}
              {...form.getInputProps("queryBy")}
            />
            <TextInput
              w="100%"
              placeholder="คำค้นหา"
              {...form.getInputProps("q")}
            />
            <Button type="submit">ค้นหา</Button>
            <Link href="/file/new">
              <Button color="teal">อัพโหลดไฟล์</Button>
            </Link>
          </form>
        </Box>

        <Table verticalSpacing="xs" striped mt="0.5rem">
          <thead>
            <tr>
              <th>ไอดีไฟล์</th>
              <th>ชื่อไฟล์</th>
              <th>ประเภท</th>
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
  let queryData: File[];

  if (query.q && query.queryBy) {
    if (
      !(query.q as string).match(/^[0-9a-fA-F]{24}$/) &&
      query.queryBy == "id"
    ) {
      const { data } = await ServerAxios<File[]>(`/admin/file`, {
        method: "GET",
        withCredentials: true,
        headers: {
          Cookie: req.headers.cookie,
        },
        validateStatus: () => true,
      });

      queryData = data;
    } else {
      const { data } = await ServerAxios<File[]>(
        `/admin/file?queryBy=${query.queryBy}&q=${query.q}`,
        {
          method: "GET",
          withCredentials: true,
          headers: {
            Cookie: req.headers.cookie,
          },
          validateStatus: () => true,
        },
      );
      queryData = data;
    }
  } else {
    const { data } = await ServerAxios<File[]>(`/admin/file`, {
      method: "GET",
      withCredentials: true,
      headers: {
        Cookie: req.headers.cookie,
      },
      validateStatus: () => true,
    });

    queryData = data;
  }

  return {
    props: {
      data: queryData,
    },
  };
};

export default FilePage;
