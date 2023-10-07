import { Group, Navbar, Button as MButton, Divider } from "@mantine/core";
import {
  IconBook2,
  IconBox,
  IconCheck,
  IconFileDescription,
  IconFolder,
  IconHome,
  IconReportAnalytics,
  IconUserCode,
  IconUsers,
} from "@tabler/icons-react";
import Button from "./Button";
import { useRouter } from "next/router";
import { ClientAxios } from "@/libs/http";
import { notifications } from "@mantine/notifications";

type Route = {
  name: string;
  route: string;
  icon: JSX.Element;
};

const routes: Route[] = [
  {
    name: "นักเรียน",
    route: "/student",
    icon: <IconUserCode />,
  },
  {
    name: "บทเรียน",
    route: "/lesson",
    icon: <IconBook2 />,
  },
  {
    name: "Assignment",
    route: "/assignment",
    icon: <IconFileDescription />,
  },
  {
    name: "ไฟล์",
    route: "/file",
    icon: <IconFolder />,
  },
];

const adminRoutes: Route[] = [
  {
    name: "ประวัติการใช้งาน",
    route: "/log",
    icon: <IconReportAnalytics />,
  },
  {
    name: "ผู้ใช้",
    route: "/user",
    icon: <IconUsers />,
  },
];

const Sidebar: React.FC = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await ClientAxios("/auth/signout", {
      method: "POST",
      withCredentials: true,
      validateStatus: () => true,
    });

    notifications.show({
      title: "ออกจากระบบสำเร็จ",
      message: "ระบบกำลังเปลี่ยนหน้า",
      icon: <IconCheck size="1.1rem" />,
      color: "teal",
    });
    router.push("/signin");
  };

  return (
    <Navbar width={{ base: 300 }} p="xs" className="flex flex-col">
      <Navbar.Section>
        <Button name="หน้าหลัก" route="/" icon={<IconHome />} />

        <Divider my="md" />

        {routes.map((route, index) => (
          <Button {...route} key={index} />
        ))}

        <Divider my="md" />

        {adminRoutes.map((route, index) => (
          <Button {...route} key={index} />
        ))}
      </Navbar.Section>

      <Navbar.Section className="mt-auto">
        <Divider my="0.5rem" />
        <Group className="grid grid-cols-2 items-center px-2 border-t-gray-500">
          <MButton color="blue" variant="outline">
            ตั้งค่าโปรไฟล์
          </MButton>
          <MButton color="red" onClick={handleSignOut}>
            ออกจากระบบ
          </MButton>
        </Group>
      </Navbar.Section>
    </Navbar>
  );
};

export default Sidebar;
