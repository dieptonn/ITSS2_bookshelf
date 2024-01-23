"use client";
import Image from "next/image";
import { BorrowBookInterface } from "@/app/models/request";

const AdminBookListitem: React.FC<{
  item: BorrowBookInterface;
}> = ({ item }) => {
  return (
    <div>
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
        </div>
      </div>
    </div>
  );
};

export default AdminBookListitem;
