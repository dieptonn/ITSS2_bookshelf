"use client";

import { useContext, useEffect, useState } from "react";
import { requestApi } from "@/app/services";
import Action from "@/app/components/action";
import { BorrowBookInterface } from "@/app/models/request";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import BookListitem from "@/app/components/booklistitem";
import withUserAuth from "@/app/components/withUserAuth";

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
        <div></div>
        <Action />
      </div>
      <div className="flex justify-between items-center pt-6 pb-4 mx-8">
        <p className=" text-gray-700 text-lg font-semibold">
          Request Book List
        </p>
        <div className="text-gray-700 text-lg font-semibold">
          <div className="flex item-center">
            <div className="text-orange-500 ">
              <FmdGoodIcon />
            </div>
            {books?.[0]?.bookInfo?.libraryName}
          </div>
        </div>
      </div>
      <div className="flex w-full px-8 pt-8 pb-4 font-medium text-base">
        <div className="w-5/12">Title</div>
        <div className="w-4/12 text-center">Category</div>
        <div className="w-2/12 text-center"></div>
      </div>
      {books?.map((item: BorrowBookInterface, index: number) => (
        <BookListitem key={index} item={item} />
      ))}
    </div>
  );
}

export default withUserAuth(Page);
