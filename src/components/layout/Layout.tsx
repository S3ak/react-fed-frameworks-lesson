import { Outlet } from "@tanstack/react-router";
import Header from "../header/Header";
import Footer from "../footer/Footer";

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
