import { notifications } from "@mantine/notifications";

export const copyToClipboard = async (text: string) => {
  await navigator.clipboard.writeText(text);
  notifications.show({
    message: "คัดลอกข้อมูลสำเร็จ",
  });
};
