import Navbar from "@/components/Navbar.jsx";
import SideBar from "@/components/SideBar.jsx";

export default function RootLayout({ children }) {
  return (
    <>
      <Navbar />
      <SideBar />
      {children}
    </>
  );
}
