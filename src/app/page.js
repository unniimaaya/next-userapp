"use client";
import Image from "next/image";
import styles from "./page.module.css";
import LoginPage from "./components/LoginPage";
import { ThemeProvider } from "@mui/material";
import theme from "@/styles/theme";

export default function Home() {
  return (
    // <ThemeProvider theme={theme}>
    //   {/* <LoginPage /> */}
    // </ThemeProvider>
    <div>
      Welcome
    </div>
  );
}
