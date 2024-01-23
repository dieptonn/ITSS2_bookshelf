import { Author, LibraryInterface } from "./books";

export interface BorrowerInterface {
  bookNumber: number;
  borrowDate: Date | null;
  id: number;
  requestDueDate: Date | null;
  status: string;
  userId: number;
  userName: string;
}

export interface BookListInterface {
  book: {
    id: number;
    title: string;
    description: string;
    cover_image_url: string;
    category: {
      id: number;
      name: string;
      parent_category_id: number;
      created_at: string;
      updated_at: string;
      parent_category_name: string | null;
    };
    publish_year: number;
    publisher: string;
    language: string;
    page_number: number;
    created_at: string;
    updated_at: string;
  };
  authors: Author[];
  librarys: LibraryInterface[];
}
