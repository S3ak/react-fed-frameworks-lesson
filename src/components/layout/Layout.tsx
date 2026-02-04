import Header from "../header/Header";
import Footer from "../footer/Footer";

function Layout({children}: {children: React.ReactNode}) {
  return <><Header /><main>{children}</main><Footer /></>;
}

export default Layout;
