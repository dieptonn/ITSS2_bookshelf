"use client";

import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
const Search = () => {
  const router = useRouter();
  const [text, setText] = useState("");
  const [option, setOption] = useState("1");
  const [query] = useDebounce(text, 500);
  useEffect(() => {
    if (!query) {
      router.push(`/`);
    } else {
      if (option === "1") {
        router.push(`/?title=${query}`);
      } else if (option === "2") {
        router.push(`/?author=${query}`);
      } else if (option === "3") {
        router.push(`/?publishingTime=${query}`);
      } else if (option === "4") {
        router.push(`/?library=${query}`);
      }
    }
  }, [query, router, option]);
  return (
    <div className=" bg-white max-w-fit rounded-full flex items-center border-2 border-gray-200 hover:border-gray-400">
      <div className="w-36 flex p-3 justify-center bg-gray-300 rounded-s-full">
        <select
          value={option}
          onChange={(e) => setOption(e.target.value)}
          name="option"
          id="option"
          className="bg-gray-300 h-full border-gray-300 border-2 outline-none"
        >
          <option value={1}>Title</option>
          <option value={2}>Author</option>
          <option value={3}>Publishing time</option>
          <option value={4}>Library</option>
        </select>
      </div>
      <input
        className="p-3 ml-2 w-80 outline-none text-gray-700"
        placeholder={"Search"}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="pr-2 border-r border-gray-300">
        <SearchIcon
          style={{
            color: "red",
          }}
        />
      </div>
      <div className="w-10"></div>
    </div>
  );
};

export default Search;
