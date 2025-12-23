import { Outlet } from "react-router-dom";
import { Header } from "../pages/Heade_Footer/Header";
import  Footer  from "../pages/Heade_Footer/Footer";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
