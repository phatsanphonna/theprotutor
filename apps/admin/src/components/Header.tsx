import { Header as MantineHeader, Text } from "@mantine/core";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <MantineHeader
      height={60}
      display="flex"
      className="flex-row justify-start items-center p-4 gap-4 select-none"
    >
      <Image
        src="/theprologo.png"
        alt="THE PRO TUTOR LOGO"
        width={40}
        height={40}
        quality={100}
        loading="eager"
        priority={true}
      />

      <Text size="xl" weight={700}>
        ระบบจัดการหลังบ้าน THE PRO TUTOR
      </Text>
    </MantineHeader>
  );
};

export default Header;
