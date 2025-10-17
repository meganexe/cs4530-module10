// Data Models
export interface Author {
  id: string;
  firstName: string;
  lastName?: string;
  birthDate: string;
  deathDate?: string;
}

export interface Genre {
  id: string;
  name: string;
}

export interface BookCopy {
  id: string;
  bookId: string;
  imprint: string;
  status: 'available' | 'unavailable' | 'can be checkout' | 'checked out';
  dueBackDate?: string;
}

export interface Book {
  id: string;
  title: string;
  authorIds: string[];
  genreIds: string[];
  isbn: string;
  summary: string;
}
