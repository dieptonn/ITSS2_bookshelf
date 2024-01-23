"use client";

import { useEffect, useState } from "react";
import { requestApi } from "@/app/services";
import { BorrowBookInterface } from "@/app/models/request";
import withAdminAuth from "@/app/components/withAdminAuth";
import AdminBookListitem from "@/app/components/adminbooklistitem";

function Page({ params }: { params: { id: number } }) {
  const { id } = params;
  const [books, setBooks] = useState<BorrowBookInterface[]>();
  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    let res = await requestApi.getBookFromRequest(id);
    setBooks(res.data);
  };

  return (
    <div>
      <div className="flex justify-between items-center pt-6 pb-4 mx-8">
        <p className=" text-gray-700 text-lg font-semibold">
          Request Book List
        </p>
      </div>
      <div className="flex w-full px-8 pt-8 pb-4 font-medium text-base">
        <div className="w-5/12">Title</div>
        <div className="w-4/12 text-center">Category</div>
        <div className="w-2/12 text-center"></div>
      </div>
      {books?.map((item: BorrowBookInterface, index: number) => (
        <AdminBookListitem key={index} item={item} />
      ))}
    </div>
  );
}

export default withAdminAuth(Page);
