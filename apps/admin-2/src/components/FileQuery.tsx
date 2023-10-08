import { ClientAxios } from "src/utils/http";
import {
  Modal,
  TextInput,
  Text,
  Flex,
  NativeSelect,
  Divider,
  Stack,
  Box,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { File } from "database";
import { IconFile, IconVideo } from "@tabler/icons-react";
import { useEffect, useState } from "react";

type Props = {
  toggle: number;
  onSelect: (file: File) => void;
};

const FileQuery: React.FC<Props> = ({ toggle, onSelect }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [query, setQuery] = useState<File[]>([]);
  const [searched, setSearched] = useState(false);

  const form = useForm({
    initialValues: {
      q: "",
      queryBy: "id",
    },
  });

  const toggleModel = () => {
    if (opened) close();
    else open();
  };

  useEffect(() => {
    if (toggle != 0) toggleModel();
    handleQuery(form.values);
  }, [toggle]);

  const handleQuery = async (values: typeof form.values) => {
    setSearched(false);

    if (
      (!values.q.match(/^[0-9a-fA-F]{24}$/) && values.queryBy == "id") ||
      !values.q
    ) {
      const { data } = await ClientAxios<File[]>(`/admin/file`, {
        method: "GET",
        withCredentials: true,
        validateStatus: () => true,
      });

      if (data.length == 0) setQuery([]);
      else setQuery(data);

      return setSearched(true);
    }

    const { data } = await ClientAxios<File[]>(
      `/admin/file?queryBy=${values.queryBy}&q=${values.q}`,
      {
        method: "GET",
        withCredentials: true,
        validateStatus: () => true,
      },
    );

    if (data.length == 0) setQuery([]);
    else setQuery(data);

    setSearched(true);
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="เลือกไฟล์"
      closeOnClickOutside={false}
    >
      <Flex direction="column" w="100%" gap="md">
        <form onSubmit={form.onSubmit(handleQuery)}>
          <Flex direction="row" w="100%" gap="xs">
            <NativeSelect
              data={[
                { value: "id", label: "ไอดีไฟล์" },
                { value: "location", label: "ที่อยู่ไฟล์" },
                { value: "name", label: "ชื่อไฟล์" },
              ]}
              w="33%"
              {...form.getInputProps("queryBy")}
            />
            <TextInput
              w="100%"
              placeholder="กด Enter เพื่อค้นหา"
              {...form.getInputProps("q")}
            />
          </Flex>
        </form>

        <Divider w="100%" />

        <Stack>
          {query.length != 0 &&
            query.map((file, index) => (
              <Box
                key={index}
                w="100%"
                mih="4rem"
                className="border-gray-500 rounded bg-gray-100 flex-col justify-center"
                display="flex"
                p="0.5rem"
              >
                <Title
                  order={4}
                  className="hover:underline cursor-pointer flex-row items-center gap-1"
                  display="flex"
                  onClick={() => {
                    onSelect(file);
                    close();
                  }}
                >
                  {file.type === "FILE" ? <IconFile /> : <IconVideo />}
                  {file.name}
                </Title>
                <Text size="xs">{file.id}</Text>
              </Box>
            ))}
          {searched && query.length == 0 && <Text>ไม่พบไฟล์ที่ต้องการหา</Text>}
        </Stack>
      </Flex>
    </Modal>
  );
};

export default FileQuery;
