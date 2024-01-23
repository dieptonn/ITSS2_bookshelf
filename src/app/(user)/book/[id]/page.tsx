"use client";

import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { bookApi, requestApi } from "@/app/services";
import {
  BookDetailInterface,
  Author,
  LibraryInterface,
} from "@/app/models/common";
import { toast } from "react-toastify";
import { UserContext } from "@/app/contexts/UserContext";
import { redirect, useRouter } from "next/navigation";
import Action from "@/app/components/action";

export default function Page({ params }: { params: { id: number } }) {
  const { id } = params;
  const [book, setBook] = useState<BookDetailInterface>();
  const [selectedLibrary, setSelectedLibrary] = useState<string | number>();
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    getBook();
  }, []);

  const getBook = async () => {
    let res = await bookApi.getBook(id);
    setBook(res.data);
  };

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user && user.role === "USER") {
      try {
        const res = await requestApi.AddBookToBorrow(
          user.userId,
          id,
          selectedLibrary
        );
        toast.success(res.data);
      } catch (error) {
        console.error("Error adding book to borrow:", error);
      }
    } else {
      toast.error("Please log in as user !");
      if (!user) {
        router.push("/login");
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center pt-6 mb-4 mx-8">
        <div></div>
        <Action />
      </div>
      <div className="flex px-8 pb-8">
        <div className="flex flex-col">
          <div className="max-h-fit px-4 py-8  rounded-lg bg-white">
            <Image
              src={book?.book.cover_image_url || "/assets/images/logo.png"}
              width={268}
              height={268}
              alt="Picture of the author"
              priority
            />
          </div>
        </div>
        <div className="w-full flex flex-col">
          <div className="flex ml-14">
            <div className="w-5/12 h-10 flex flex-col text-gray-600">
              <p className="text-3xl">{book?.book.title}</p>
              <p className="text-base">
                By{" "}
                <span className="decoration-solid underline">
                  {book?.authors.map((item: Author) => (
                    <span key={item.id}>{item.name}, </span>
                  ))}
                </span>
                {book?.book.publish_year}
              </p>
              <p className="text-xs text-gray-400 mb-8">
                {book?.book.publisher}
              </p>
              <p className="text-sm text-gray-700 font-semibold">Status</p>
              <form>
                {book?.librarys.map((item: LibraryInterface) => (
                  <div key={item.library.id}>
                    <input
                      className="my-3 mr-2"
                      type="radio"
                      id={`library-${item.library.id}`}
                      value={item.library.id}
                      checked={selectedLibrary === item.library.id}
                      onChange={() => setSelectedLibrary(item.library.id)}
                    />
                    <label
                      className="text-base text-gray-700 font-semibold"
                      htmlFor={`library-${item.library.id}`}
                    >
                      {`${item.library.name} (${item.quantity})`}
                    </label>
                    <br />
                  </div>
                ))}
                <button
                  onClick={(e) => handleAddBook(e)}
                  className="rounded px-2 py-3 mt-4 w-52 text-lg font-semibold text-gray-100 bg-[#F27851] hover:bg-orange-600"
                >
                  Add to request list
                </button>
              </form>
            </div>
            <div className="w-5/12 bg-white rounded-lg p-6 flex flex-col h-96">
              <div className="flex justify-between">
                <div className="flex flex-col w-3/5">
                  <p className="font-semibold text-2xl">
                    <span className="text-orange-500">About</span> Author
                  </p>
                  <p className="text-gray-700 text-lg my-4">
                    {book?.authors[0].name}
                  </p>
                </div>
                <div className="w-2/5">
                  <Image
                    src="/assets/images/author.png"
                    width={88}
                    height={88}
                    alt="Picture of the author"
                    priority
                  />
                </div>
              </div>
              <p className="text-xs text-gray-800 mb-4">
                {book?.authors[0].description}
              </p>

              <p className="font-bold text-gray-700 text-sm mb-2">
                Other Books
              </p>
              <div className="flex">
                {book?.ortherBooks.map((item) => {
                  return (
                    <Image
                      key={item.id}
                      src={item.cover_image_url}
                      width={75}
                      height={75}
                      alt="Picture of the author"
                      priority
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-14 mt-8">
            <div className="bg-white w-full border-b-2 border-gray-200">
              <div className="py-2">
                <span className="p-2 border-b-4 border-orange-400 font-semibold text-orange-400">
                  Overview
                </span>
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <div className="w-1/5 bg-white p-1 rounded-md text-center border-2 border-gray-200">
                <div className="flex flex-col items-center">
                  <p className="text-xs font-semibold text-gray-500">
                    Publish Date
                  </p>
                  <p className="text-xs text-gray-700 font-semibold">
                    {book?.book.publish_year}
                  </p>
                </div>
              </div>
              <div className="w-1/5 bg-white p-1 rounded-md text-center border-2 border-gray-200">
                <div className="flex flex-col items-center">
                  <p className="text-xs font-semibold text-gray-500">
                    Publisher
                  </p>
                  <p className="text-xs text-gray-700 font-semibold text-orange-500">
                    {book?.book.publisher}
                  </p>
                </div>
              </div>
              <div className="w-1/5 bg-white p-1 rounded-md text-center border-2 border-gray-200">
                <div className="flex flex-col items-center">
                  <p className="text-xs font-semibold text-gray-500">
                    Language
                  </p>
                  <p className="text-xs text-gray-700 font-semibold text-orange-500">
                    English
                  </p>
                </div>
              </div>
              <div className="w-1/5 bg-white p-1 rounded-md text-center border-2 border-gray-200">
                <div className="flex flex-col items-center">
                  <p className="text-xs font-semibold text-gray-500">Pages</p>
                  <p className="text-xs text-gray-700 font-semibold">
                    {book?.book.page_number}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm py-6 font-semibold text-gray-500">
              Preview availiable in:{" "}
              <span className="text-orange-500">{book?.book.language}</span>
            </p>
            <p className="text-xs text-gray-800">{book?.book.description}</p>
            <div className="text-gray-700 p-6 w-1/2 mt-6 rounded-md border-2 border-gray-200 bg-white">
              <p className="font-semibold text-2xl">Book Details</p>
              <p className="text-sm font-semibold mt-6">
                {book?.book.publisher}
              </p>
              <p className="text-xs font-semibold my-2">
                {book?.book.language}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
