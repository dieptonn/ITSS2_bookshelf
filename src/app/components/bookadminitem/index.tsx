"use client";
import Image from "next/image";
import { BookListInterface } from "@/app/models/admin";

const Bookadminitem: React.FC<{
  book: BookListInterface;
}> = ({ book }) => {
  return (
    <div className="px-8 mb-4 text-gray-700">
      <div className="flex w-full bg-white rounded-lg shadow-md">
        <div className="w-5/12 flex p-4">
          <Image
            src={book.book.cover_image_url}
            width={56}
            height={56}
            alt="Image of the author"
            priority
          />
          <div className="ml-8 flex flex-col justify-center">
            <p className="text-lg">{book.book.title}</p>

            <div className="flex flex-col justify-around mt-2">
              <p className="text-sm">{book.book.publish_year}</p>
            </div>
          </div>
        </div>
        <div className="w-3/12 flex justify-center flex-col items-center"></div>
        <div className="w-3/12 flex justify-center flex-col">
          <p className="text-base">{book.book.category.name}</p>
          {book.book.category.parent_category_name !== null && (
            <p className="text-base mt-2">
              {book.book.category.parent_category_name}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookadminitem;
