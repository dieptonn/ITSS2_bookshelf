import { BookDetailInterface } from "../models/common";
import { axiosClient } from "./axios-cilent";
import { AxiosResponse } from "axios";

export const bookApi = {
  getBooks() {
    return axiosClient.get(`/book/list`);
  },
  getBook(id: number): Promise<AxiosResponse<BookDetailInterface>> {
    return axiosClient.get(`/book/get-by-id/${id}`);
  },
  searchBook(
    title: string | null,
    authorName: string | null,
    publishYear: string | null,
    libraryName: string | null,
    categoryId: string | null
  ) {
    if (title === "" && publishYear === "" && categoryId === "")
      return axiosClient.get(`/book/list`);
    else if (
      title !== "" &&
      libraryName === "" &&
      authorName === "" &&
      publishYear === "" &&
      categoryId === ""
    )
      return axiosClient.get(`/book/search?title=${title}`);
    else if (
      title === "" &&
      libraryName !== "" &&
      authorName === "" &&
      publishYear === "" &&
      categoryId === ""
    )
      return axiosClient.get(`/book/search?libraryName=${libraryName}`);
    else if (
      title === "" &&
      libraryName === "" &&
      authorName !== "" &&
      publishYear === "" &&
      categoryId === ""
    )
      return axiosClient.get(`/book/search?authorName=${authorName}`);
    else if (
      title === "" &&
      libraryName === "" &&
      authorName === "" &&
      publishYear !== "" &&
      categoryId === ""
    )
      return axiosClient.get(`/book/search?publishYear=${publishYear}`);
    else if (
      title === "" &&
      libraryName === "" &&
      authorName === "" &&
      publishYear === "" &&
      categoryId !== ""
    )
      return axiosClient.get(`/book/search?categoryId=${categoryId}`);
  },
};
