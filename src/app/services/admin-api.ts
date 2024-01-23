import { axiosClient } from "./axios-cilent";

export const adminApi = {
  getAllRequests(libraryId: number) {
    return axiosClient.get(`/borrow-request/list?libraryId=${libraryId}`);
  },
  getBooksByLibrary(id: number) {
    return axiosClient.get(`/book/listConvert?library_id=${id}`);
  },
};
