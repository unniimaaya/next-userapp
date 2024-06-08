"use client";
import Image from "next/image";
import styles from "./page.module.css";
import LoginPage from "./components/LoginPage";
import { ThemeProvider } from "@mui/material";
import theme from "@/styles/theme";
import Login from "./components/LoginPage";
import Pages from "./login/page";

export default function Home() {
  return (

    <div>
   <Pages/>
    </div>
  );
}
