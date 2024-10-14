"use client";
import Navbar from "@/components/Navbar.jsx";
import SideBar from "@/components/SideBar.jsx";
import { useRouter } from "next/navigation.js";
import { useRecoilValue } from "recoil";
import { userState } from "../(states)/userState.js";

export default function RootLayout({ children }) {
  const user = useRecoilValue(userState);
  const router = useRouter(); // Initialize the router

  if (!user) {
    // Redirect to /auth if user is not logged in
    router.push("/auth");
    return null; // Don't render anything while redirecting
  }
  return (
    <>
      <Navbar />
      <SideBar />
      {children}
    </>
  );
}
