"use client";
import Login from "../components/LoginPage"
import { ThemeProvider } from "@mui/material";
import theme from "@/styles/theme";
function Pages(){
    return(
        <>
         <ThemeProvider theme={theme}>
         <Login/>
         </ThemeProvider>
       
        </>
    )
}
export default Pages