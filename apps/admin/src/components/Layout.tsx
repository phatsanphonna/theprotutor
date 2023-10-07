import { AppShell } from "@mantine/core";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useRouter } from "next/router";

type Props = {
  children: JSX.Element | JSX.Element[];
};

const Layout: React.FC<Props> = ({ children }) => {
  const router = useRouter();

  return (
    <AppShell padding="md" mih="100vh" navbar={<Sidebar />} header={<Header />}>
      {children}
    </AppShell>
  );
};

export default Layout;
