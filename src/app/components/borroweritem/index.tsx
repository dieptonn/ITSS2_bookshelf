"use client";
import Image from "next/image";
import { BorrowerInterface } from "@/app/models/admin";
import Link from "next/link";

const Borroweritem: React.FC<{
  borrower: BorrowerInterface;
}> = ({ borrower }) => {
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
            src="/assets/images/avatar.png"
            width={56}
            height={56}
            alt="Image of the author"
            priority
          />
          <div className="ml-8 flex flex-col justify-center">
            <Link href={`/admin/request/${borrower.id}`}>
              <p className="text-lg">{borrower.userName}</p>
            </Link>
          </div>
        </div>
        <div className="w-2/12 flex justify-center flex-col text-center">
          {borrower.bookNumber}
        </div>
        <div className="w-2/12 flex justify-center flex-col text-center">
          {formatDate(borrower.borrowDate)}
        </div>
        <div className="w-2/12 flex justify-center flex-col text-center">
          {formatDate(borrower.requestDueDate)}
        </div>
        <div className="w-2/12 flex justify-center flex-col text-center items-center">
          {borrower.status}
        </div>
      </div>
    </div>
  );
};

export default Borroweritem;
