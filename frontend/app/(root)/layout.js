"use client";

import Navbar from "@/components/Navbar.jsx";
import SideBar from "@/components/SideBar.jsx";
import { useRouter } from "next/navigation.js";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../(states)/userState.js";

export default function RootLayout({ children }) {
  const user = useRecoilValue(userState);
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [user, router]);

  return (
    <>
      <Navbar />
      <SideBar />
      {children}
    </>
  );
}
