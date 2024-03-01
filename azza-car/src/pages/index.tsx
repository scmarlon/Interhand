import Navbar from "../components/Navbar";
import Login from "@/components/login/login";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "AzzaCar",
};

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar children={undefined} />
      {children}
      <Login />
    </>
  );
}
