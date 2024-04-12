import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import AxiosInstance, { LoginInstance } from "@/utils/AxiosInstance";
import axios from "axios";
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router'



const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const router = useRouter();
 
  const classes = useStyles();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const BASE_URL="https://interview.enfono.com/api_bcc"

  const SubmitData = (e) => {
    e.preventDefault();
    if (userName && password) {
      LoginInstance.post(
        `${BASE_URL}/api/auth/login/`,
        {
          username: userName,
          password: password,
        }
      )
        .then((res) => {
         
          if(res.status === 200){
            console.log("success",res?.data?.data);
           
            localStorage.setItem("userClicked", "userLogin");
            localStorage.setItem(
              "AccessToken",
              JSON.stringify(res?.data?.data?.token?.access)
            );
            router.push("/dashboard");
          }
       
        })
        .catch((err) => {
          console.log("Error", err);
        });
    }
  };


  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} 
        onSubmit={SubmitData}
        
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
               
                label="Username"
               
                autoFocus
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
               
                inputProps={{
                  autoComplete: "new-password",
                  form: { autoComplete: "on" },
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Login;
