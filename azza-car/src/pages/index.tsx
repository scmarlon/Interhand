import Navbar from "../components/Navbar";
import Login from "@/components/login/login";
import { Inter } from "next/font/google";
import { Metadata } from "next";
//import Layout from "./layout";
import React from "react";
import FileHandler from "../components/txtFiles/fileHandler";

//const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AzzaCar",
};

// export default function Home() {
//   return (
//     <main
//     // className={`flex min-h-screen flex-col  justify-between p-2 ${inter.className}`}
//     >
//       <Navbar />
//       <Login />
//       <div>Contenido del div</div>
//     </main>
//   );
// }

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {/* {children}
      <Login /> */}
      <FileHandler />
    </>
  );
}

// import React from "react";
// // import "./styles/globals.css";
// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import Navbar from "../components/Navbar";

// const inter = Inter({ subsets: ["latin"] });

// // export const metadata: Metadata = {
// //   title: "AzzaCar",
// // };

// export default function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <main className={inter.className}>
//       <Navbar />
//       {children}
//     </main>
//   );
// }
