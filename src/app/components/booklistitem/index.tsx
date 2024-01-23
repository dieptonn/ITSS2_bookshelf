"use client";
import Image from "next/image";
import { BorrowBookInterface } from "@/app/models/request";
import { useState } from "react";
import { toast } from "react-toastify";
import { requestApi } from "@/app/services";

const BookListitem: React.FC<{
  item: BorrowBookInterface;
}> = ({ item }) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDeleteBook = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await requestApi.DeleteBook(item.bookInfo.borrowBookInstanceId);
    console.log(res);
    setIsDeleted(true);
    toast.success("Delete Successfully");
  };
  return (
    <div>
      {!isDeleted && (
        <div className="px-8 w-full text-gray-700 mb-4">
          <div className=" flex w-full bg-white rounded-lg shadow-md">
            <div className="w-5/12 flex p-4">
              <Image
                src={item.bookInfo.image}
                width={56}
                height={56}
                alt="Image of the author"
                priority
              />
              <div className="ml-8 flex flex-col justify-center">
                <p className="text-lg">{item.bookInfo.title}</p>
                <div className="flex flex-col justify-around mt-2">
                  <p className="text-sm">{item.bookInfo.pushlisher}</p>
                </div>
              </div>
            </div>
            <div className="w-4/12 flex justify-center flex-col items-center">
              <p className="text-base">{item.bookInfo.categoryName}</p>
              {item.parentCategoryName !== null && (
                <p className="text-base mt-2">{item.parentCategoryName}</p>
              )}
            </div>
            <div className="w-2/12 text-center flex justify-end items-center">
              <div
                onClick={(e) => handleDeleteBook(e)}
                className="bg-red-500 px-4 py-1 rounded text-white cursor-pointer"
              >
                Delete
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookListitem;
