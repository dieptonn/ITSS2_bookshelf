"use client";
import { RegisterPayload } from "@/app/models/auth";
import { authApi } from "@/app/services";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function Register() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [account, setAccount] = useState<RegisterPayload>();
  const [cfPassword, setCfPassword] = useState("");
  const router = useRouter();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const [showCfPassword, setShowCfPassword] = React.useState(false);
  const handleClickShowCfPassword = () => setShowCfPassword((show) => !show);

  const handleMouseDownCfPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (account?.password === cfPassword) {
      const res = await authApi.register({
        ...(account as RegisterPayload),
        role: "USER",
        libraryId: "",
      });
      if (res.status === 403) toast.error("Register Failure !");
      if (res.status === 200) {
        toast.success("Register Successfully !");
        router.push(`/login`);
      }
    } else {
      toast.error("Password and CfPassword is don't match");
    }
  };
  return (
    <div className="bg-white flex flex-col py-6 px-12 rounded-lg items-center justify-center text-gray-700 shadow-2xl">
      <Image
        src="/assets/images/logo.png"
        width={110}
        height={110}
        alt="Picture of the author"
        className="py-4"
        priority
      />
      <p className="py-4">Registration</p>

      <Box component="form" onSubmit={handleRegister}>
        <div className="flex flex-col justify-start w-80">
          <p className="text-sm font-semibold my-1">Username</p>
          <TextField
            maxRows={4}
            value={account?.username}
            required
            type="text"
            onChange={(e) =>
              setAccount({
                ...(account as RegisterPayload),
                username: e.target.value,
              })
            }
          />
          <p className="text-sm font-semibold my-1">College Email ID</p>
          <TextField
            value={account?.email}
            required
            type="email"
            onChange={(e) =>
              setAccount({
                ...(account as RegisterPayload),
                email: e.target.value,
              })
            }
            maxRows={4}
          />
          <p className="text-sm font-semibold my-1">Password</p>
          <FormControl variant="outlined">
            <OutlinedInput
              type={showPassword ? "text" : "password"}
              value={account?.password}
              required
              onChange={(e) =>
                setAccount({
                  ...(account as RegisterPayload),
                  password: e.target.value,
                })
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
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
          <p className="text-sm font-semibold my-1">Confirm Password</p>
          <FormControl variant="outlined">
            <OutlinedInput
              type={showCfPassword ? "text" : "password"}
              value={cfPassword}
              required
              onChange={(e) => setCfPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowCfPassword}
                    onMouseDown={handleMouseDownCfPassword}
                    edge="end"
                  >
                    {showCfPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
        <button
          type="submit"
          className="w-full bg-[#FA7C54] hover:bg-orange-600 text-sm text-white rounded-md text-center py-3 mt-6 cursor-pointer"
        >
          Register
        </button>
      </Box>
      <div className="flex justify-between w-full items-center my-4">
        <p className="text-sm">
          Already a User?{" "}
          <Link href="/login">
            <span className="decoration-solid underline">Login now</span>
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
