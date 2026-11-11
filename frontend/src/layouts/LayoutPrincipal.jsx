import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";


export default function LayoutPrincipal() {
  return (
    <>
      <Header />
      <Navbar />

      <main className="main-container">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
