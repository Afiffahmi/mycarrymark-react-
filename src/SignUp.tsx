import * as React from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import Add from "@mui/icons-material/Add";
import Box from "@mui/joy/Box";
import {
  Alert,
  Select,
  Typography,
  Option,
  Link,
  Avatar,
  TextField,
  Card,
} from "@mui/joy";
import LinearProgress from "@mui/joy/LinearProgress";
import axios from "axios";
import { Grid } from "@mui/joy";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Checkbox from "@mui/joy/Checkbox";
//@ts-ignore
import logo from "./logomcm.svg";

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="white" align="center" {...props}>
      {"Copyright © "}
      MyCarrymark {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  fullname: HTMLInputElement;
}
interface SignUpFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function SignUp() {
  const [formData, setFormData] = React.useState({});
  const [success, setSuccess] = React.useState(false);
  const [messages, setMessages] = React.useState('');

  const handleSubmit = (event: React.FormEvent<SignUpFormElement>) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements;
    const emailElement = formElements.email;
    const passwordElement = formElements.password;

    if (emailElement && passwordElement) {
      const data = {
        email: emailElement.value,
        password: passwordElement.value,
      };

      console.log(data);

      const formAction = `https://mycarrymark-node-afiffahmis-projects.vercel.app/auth/signup`;
      const formMethod = "POST";

      fetch(formAction, {
        method: formMethod,
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return response.json();
        } else {
          return response.text();
        }
      })
      .then((responseData) => {
        console.log(responseData);
        if(responseData.message === 'account successfully created'){
        setMessages(responseData.message);
        setSuccess(true);
            
        }else{
        setMessages(responseData);
        setSuccess(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  return (
    <Box
      sx={{
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundImage: `url(https://files.123freevectors.com/wp-content/original/143033-abstract-dark-red-wave-business-background.jpg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      {success && (
        <Alert variant="solid" color="primary">{messages}</Alert>
      )}
      <Card sx={{ minWidth: 445, bgcolor: "primary.main" }}>
        
        <Box
          component="img"
          sx={{
            height: 280,
            width: 350,
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            alignSelf: "center",
          }}
          src={logo}
        ></Box>

        <Typography component="h1">Sign up</Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
  <FormControl>
    <FormLabel htmlFor="email">Email address</FormLabel>
    <Input name="email" fullWidth type='email'></Input>
  </FormControl>
  <FormControl>
    <FormLabel htmlFor="password">Password</FormLabel>
    <Input name="password" fullWidth type='password'></Input>
  </FormControl>
          <Button type="submit" fullWidth sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid>
              <Link href="/">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </Box>
      </Card>
      <Copyright />
    </Box>
  );
}
