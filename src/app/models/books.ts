export interface Author {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface LibraryInterface {
  library: {
    id: number | string;
    name: string;
    location: string;
    created_at: string;
    updated_at: string;
  };
  quantity: number;
}

export interface BooksInterface {
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
  totalQuantity: number;
}
