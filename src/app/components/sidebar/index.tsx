"use client";

import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "@/app/contexts/UserContext";

const Sidebar = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="flex flex-col">
      <Image
        src="/assets/images/logo.png"
        width={100}
        height={100}
        alt="Picture of the author"
        className="py-8"
        priority
      />

      <div className="flex flex-col text-zinc-400">
        <Link href={user?.role === "LIBRARIAN" ? "/admin" : "/"}>
          <div className="flex items-center pt-4">
            <SearchIcon />
            <span className="ml-2">Search</span>
          </div>
        </Link>
        <Link href={user?.role === "LIBRARIAN" ? "/admin/request" : "/request"}>
          <div className="flex items-center pt-4">
            <RequestPageIcon />
            <span className="ml-2">Request List</span>
          </div>
        </Link>
        {user?.role !== "LIBRARIAN" && (
          <Link href="/borrowed">
            <div className="flex items-center pt-4">
              <LibraryBooksIcon />
              <span className="ml-2">Borrowed List</span>
            </div>
          </Link>
        )}
        {user?.role === "LIBRARIAN" && (
          <div>
            <Link href="/admin/borrow">
              <div className="flex items-center pt-4">
                <SearchIcon />
                <span className="ml-2">Borrow Book</span>
              </div>
            </Link>
            <Link href="/admin/return">
              <div className="flex items-center pt-4">
                <SearchIcon />
                <span className="ml-2">Return Book</span>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
