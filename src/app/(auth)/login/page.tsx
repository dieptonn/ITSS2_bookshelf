"use client";
import { LoginPayload } from "@/app/models/auth";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "@/app/contexts/UserContext";
import { useRouter } from "next/navigation";
import { authApi } from "@/app/services/auth-api";

export default function Login() {
  const [account, setAccount] = useState<LoginPayload>({
    email: "",
    password: "",
  });
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const { user, dispatch } = useContext(UserContext);
  const router = useRouter();

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (user && user.accessToken) {
      router.back();
    }
  }, []);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await authApi.login(account);
      if (res.status === 403) {
        dispatch && dispatch({ type: "LOGIN_FAILURE" });
      } else {
        dispatch && dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        if (res.data.role === "USER") router.push(`/`);
        else router.push(`/admin`);
      }
    } catch (e) {
      const error = e as AxiosError;
      toast.error(error.message);
    }
  };
  return (
    <div className="bg-white flex flex-col py-8 px-12 rounded-lg items-center justify-center text-gray-700 shadow-2xl">
      <Image
        src="/assets/images/logo.png"
        width={110}
        height={110}
        alt="Picture of the author"
        className="py-6"
        priority
      />
      <p className="pt-4">Welcome Back !</p>
      <p className="text-xs text-gray-400 py-2">
        Sign in to continue to yourDigital Library
      </p>
      <Box component="form" onSubmit={handleLogin}>
        <div className="flex flex-col justify-start w-80">
          <p className="text-sm font-semibold my-1">Email</p>
          <TextField
            maxRows={4}
            required
            type="email"
            value={account?.email}
            onChange={(e) =>
              setAccount({
                ...(account as LoginPayload),
                email: e.target.value,
              })
            }
          />
          <p className="text-sm font-semibold my-1">Password</p>

          <FormControl variant="outlined">
            <OutlinedInput
              type={showPassword ? "text" : "password"}
              value={account?.password}
              onChange={(e) =>
                setAccount({
                  ...(account as LoginPayload),
                  password: e.target.value,
                })
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
        <div className="flex justify-between w-full items-center my-4">
          <div className="flex items-center">
            <Checkbox {...label} defaultChecked />
            <p className="text-sm">Remember me</p>
          </div>
          <p className="text-sm decoration-solid underline ">
            Forgot password?
          </p>
        </div>
        <button
          type="submit"
          className="w-full bg-[#FA7C54] hover:bg-orange-600 text-sm text-white rounded-md text-center py-3 cursor-pointer"
        >
          Login
        </button>
      </Box>
      <div className="flex justify-between w-full items-center my-10">
        <p className="text-sm">
          New User?{" "}
          <Link href="/register">
            <span className="decoration-solid underline">Register Here</span>
          </Link>
        </p>
        <Link href="/">
          <p className="text-sm hover:underline hover:decoration-solid">
            Use as Guest
          </p>
        </Link>
      </div>
    </div>
  );
}
