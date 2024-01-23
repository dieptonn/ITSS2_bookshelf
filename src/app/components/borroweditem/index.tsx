"use client";
import Image from "next/image";
import { BorrowingBookInterface } from "@/app/models/borrowed";

const Borroweditem: React.FC<{
  book: BorrowingBookInterface;
}> = ({ book }) => {
  const formatDate = (dateString: any) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  return (
    <div className="px-8 mb-4 text-gray-700">
      <div className="flex w-full bg-white rounded-lg shadow-md">
        <div className="w-4/12 flex p-4">
          <Image
            src={book.bookInfo.image}
            width={56}
            height={56}
            alt="Image of the author"
            priority
          />
          <div className="ml-8 flex flex-col justify-center">
            <p className="text-lg">{book.bookInfo.title}</p>
          </div>
        </div>
        <div className="w-2/12 flex justify-center flex-col text-center">
          {book.bookInfo.libraryName}
        </div>
        <div className="w-2/12 flex justify-center flex-col text-center">
          {formatDate(book.bookInfo.borrowDate)}
        </div>
        <div className="w-2/12 flex justify-center flex-col text-center">
          {formatDate(book.bookInfo.requestDueDate)}
        </div>
        <div className="w-2/12 flex justify-center flex-col text-center items-center">
          <p
            className={`${
              book.bookInfo.status === "BORROWING"
                ? "bg-green-500"
                : book.bookInfo.status === "OVERDUE"
                ? "bg-red-500"
                : "bg-blue-600"
            } w-fit p-1 rounded-md text-white lowercase`}
          >
            {book.bookInfo.status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Borroweditem;
