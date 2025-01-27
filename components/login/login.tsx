"use client";

import {
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useActionState, useEffect, useState } from "react";
import { ButtonLogin } from "@/components/button";
import { LoginCredentials } from "@/lib/actions";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction] = useActionState(LoginCredentials, null);
  console.log(state);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (state?.message) {
      toast.error(state.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "colored",
      });
    }
  }, [state?.message]);

  return (
    <div className="p-8 bg-white/30  rounded-lg inset-0  backdrop-blur-md sm:w-3/5 shadow-lg max-w-md  ">
      <h1 className="text-2xl text-center font-bold">Login</h1>
      <form action={formAction}>
        <FormControl
          fullWidth
          error={!!state?.error?.username}
          variant="standard"
        >
          <InputLabel htmlFor="component-error">Username</InputLabel>
          <Input
            name="username"
            id="component-error"
            aria-describedby="component-error-text"
          />
          <FormHelperText id="component-error-text">
            {state?.error?.username}
          </FormHelperText>
        </FormControl>
        <FormControl
          variant="standard"
          error={!!state?.error?.password}
          fullWidth
          className="mt-10"
        >
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            name="password"
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />

          <FormHelperText>{state?.error?.password}</FormHelperText>
        </FormControl>
        <ButtonLogin />
      </form>
    </div>
  );
};

export default LoginPage;
