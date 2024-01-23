export interface BorrowRequestInterface {
  userId: number;
  libraryId: string;
  libraryName: string;
  bookNumber: number;
  borrowDate: string | null;
  requestDueDate: string | null;
  returnDate: string | null;
  code: string | null;
  status: string;
  id: number;
}

export interface BorrowBookInterface {
  parentCategoryName: string | null;
  bookInfo: {
    borrowBookInstanceId: number;
    pushlisher: string;
    image: string;
    categoryId: number;
    categoryName: string;
    borrowRequestId: number;
    requestDate: Date;
    libraryId: number;
    libraryName: string;
    parentCategoryId: number;
    title: string;
    id: number;
  };
}
