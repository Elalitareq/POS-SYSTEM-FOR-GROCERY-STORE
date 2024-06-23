import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const defaultTheme = createTheme();

export default function SignUp() {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  const url = process.env.REACT_APP_API_URL;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const loginAth = {
      userName: data.get("userName"),
      password: data.get("password"),
    };

    try {
      const response = await axios.post(url + "/api/users/login", loginAth);

      const { token, userData } = response.data;
      if (
        signIn({
          auth: {
            token: token,
            type: "Bearer",
          },
          userState: {
            userName: userData.userName,
            id: userData.id,
            role: userData.role,
          },
        })
      ) {
        navigate("/");
      }
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        maxWidth="xs"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
            justifyContent: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            تعاونية جابر
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            style={{ height: "100%" }}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="userName"
                  label="اسم المستخدم"
                  name="userName"
                  autoComplete="userName"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="كلمة المرور"
                  type={isPasswordVisible ? "text" : "password"}
                  id="password"
                  autoComplete="password"
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() => {
                          setIsPasswordVisible(!isPasswordVisible);
                        }}
                      >
                        {isPasswordVisible ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Typography
              variant="body2"
              sx={{ color: "red", textAlign: "center", mt: 2 }}
            >
              {errorMessage && "الرجاء التحقق من اسم المستخدم وكلمة المرور"}
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              تسجيل الدخول
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
