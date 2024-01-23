"use client";

import withAdminAuth from "@/app/components/withAdminAuth";
import { UserContext } from "@/app/contexts/UserContext";
import { requestApi } from "@/app/services";
import { TextField } from "@mui/material";
import { AxiosError } from "axios";
import Image from "next/image";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

function Borrow() {
  const [code, setCode] = useState("");
  const { user } = useContext(UserContext);

  const handleAcceptRequest = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const res = await requestApi.AcceptRequest(code, user?.libraryId);
      if (res?.status === 404) {
        toast.error(res.data);
      } else toast.success(res.data);
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
      <p className="text-sm text-gray-600 py-4">Input the request code</p>
      <form
        onSubmit={handleAcceptRequest}
        className="flex flex-col justify-start w-80"
      >
        <p className="text-sm font-semibold my-6">Request code</p>
        <TextField
          maxRows={4}
          required
          type="password"
          value={code}
          size="small"
          onChange={(e) => setCode(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-[#FA7C54] hover:bg-orange-600 text-sm text-white rounded-md text-center py-3 mt-8 mb-48 cursor-pointer"
        >
          Submit request code
        </button>
      </form>
    </div>
  );
}
export default withAdminAuth(Borrow);
