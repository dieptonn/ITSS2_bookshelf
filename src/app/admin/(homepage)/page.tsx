"use client";

import Bookadminitem from "@/app/components/bookadminitem";
import withAdminAuth from "@/app/components/withAdminAuth";
import { UserContext } from "@/app/contexts/UserContext";
import { BookListInterface } from "@/app/models/admin";
import { adminApi } from "@/app/services";
import { useContext, useEffect, useState } from "react";

function Homepage() {
  const [books, setBooks] = useState<any>([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    let res = await adminApi.getBooksByLibrary(user?.libraryId);
    setBooks(res.data);
  };

  return (
    <div>
      <div className="flex w-full px-8 pt-8 pb-4 font-medium text-base">
        <div className="w-5/12">Title</div>
        <div className="w-3/12 text-center">Status</div>
        <div className="w-3/12">Category</div>
      </div>
      {books?.map((book: BookListInterface) => (
        <Bookadminitem key={book.book.id} book={book} />
      ))}
    </div>
  );
}
export default withAdminAuth(Homepage);
