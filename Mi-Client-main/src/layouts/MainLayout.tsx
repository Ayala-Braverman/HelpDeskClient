import { Outlet} from "react-router-dom";
import AppShell from "./AppShell";

const MainLayout = () => {
  

  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
};

export default MainLayout;
