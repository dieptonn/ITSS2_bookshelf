"use client";
import Image from "next/image";
import Link from "next/link";
import { BooksInterface } from "@/app/models/books";

const Bookitem: React.FC<{
  book: BooksInterface;
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
            <Link href={`/book/${book.book.id}`}>
              <p className="text-lg">{book.book.title}</p>
            </Link>
            <div className="flex flex-col justify-around mt-2">
              <p className="text-sm">{book.book.publish_year}</p>
            </div>
          </div>
        </div>
        <div className="w-3/12 flex justify-center flex-col items-center">
          {book.totalQuantity > 0 ? (
            <div className="bg-green-500 py-1 px-2 rounded text-white text-sm">
              Avaliable
            </div>
          ) : (
            <div className="bg-red-600 py-1 px-2 rounded text-white text-sm">
              Unable
            </div>
          )}
        </div>
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

export default Bookitem;
