import Layout from "@/components/Layout";
import { ClientAxios } from "src/utils/http";
import {
  Box,
  Button,
  Divider,
  Flex,
  Group,
  TextInput,
  Title,
  Select,
  FileInput,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { FileType } from "database";
import { IconCheck } from "@tabler/icons-react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

const NewFilePage: NextPage = () => {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      name: "",
      type: FileType.FILE as FileType,
      location: "",
      file: null,
    },
    validateInputOnChange: true,
    validate: {},
  });

  const [spinner, setSpinner] = useState(false);

  const handleUpdateData = async (values: typeof form.values) => {
    const formData = new FormData();

    formData.append("file", values.file!);
    formData.append("name", values.name);
    formData.append("type", values.type);

    setSpinner(true);

    const { data, status } = await ClientAxios.post(
      `/admin/file/upload`,
      formData,
      {
        validateStatus: () => true,
      },
    );

    if (status === 201) {
      notifications.show({
        message: "อัพเดทข้อมูลสำเร็จ",
        color: "teal",
        icon: <IconCheck />,
      });

      router.push(`/file/${data.id}`);
    }

    setSpinner(false);
  };

  return (
    <>
      <Head>
        <title>สร้างไฟล์ | ระบบจัดการหลังบ้าน THE PRO TUTOR</title>
      </Head>

      <Layout>
        <form onSubmit={form.onSubmit(handleUpdateData)}>
          <LoadingOverlay visible={spinner} overlayBlur={2} />

          <Box className="flex flex-row gap-4">
            <Group className="flex flex-col items-start w-full">
              <Title order={2} mb="-1rem">
                สร้างไฟล์ใหม่
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
                อัพโหลดข้อมูล
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
                  label="ชื่อไฟล์"
                  type="text"
                  placeholder="ชื่อไฟล์"
                  {...form.getInputProps("name")}
                />

                <Select
                  label="ประเภทของไฟล์"
                  withAsterisk={true}
                  data={[
                    { label: "วิดีโอ", value: "VIDEO" },
                    { label: "เอกสาร", value: "FILE" },
                  ]}
                  {...form.getInputProps("type")}
                />

                {form.values.type == FileType.VIDEO ? (
                  <TextInput
                    withAsterisk
                    required
                    error={form.errors}
                    label="ที่อยู่ไฟล์"
                    type="text"
                    placeholder="ที่อยู่ไฟล์"
                    {...form.getInputProps("location")}
                  />
                ) : (
                  <FileInput
                    placeholder="อัพโหลดไฟล์"
                    label="อัพโหลดไฟล์"
                    withAsterisk
                    accept="application/pdf"
                    {...form.getInputProps("file")}
                  />
                )}
              </Box>
            </Group>
          </Group>
        </form>
      </Layout>
    </>
  );
};

export default NewFilePage;
