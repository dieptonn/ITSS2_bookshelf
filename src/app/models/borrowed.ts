export interface BorrowingBookInterface {
  parentCategoryName: string | null;
  bookInfo: {
    categoryId: number;
    categoryName: string;
    borrowRequestId: number;
    requestDate: Date;
    pushlisher: string;
    image: string;
    borrowBookInstanceId: number;
    libraryId: number;
    libraryName: string;
    status: string;
    parentCategoryId: number;
    title: string;
    borrowDate: Date;
    requestDueDate: Date;
    id: number;
  };
}
