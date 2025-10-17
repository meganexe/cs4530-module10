import { Book, Author, Genre, BookCopy } from '../models';

// In-memory storage
export let books: Book[] = [];
export let authors: Author[] = [];
export let genres: Genre[] = [];
export let bookCopies: BookCopy[] = [];

/**
 * uses the Math.random function to generate a simple unique ID.
 * @returns a new unique ID
 */
export const generateId = (): string => Math.random().toString(36).substr(2, 9);

/**
 * Finds the first book, author, genre, or book copy with the given ID.
 * @param id the book ID to search for
 * @returns the book, author, genre, or book copy if found, otherwise undefined
 */
export const findBookById = (id: string): Book | undefined => 
  books.find(book => book.id === id);

/**
 * Finds the first author with the given ID.
 * @param id the author ID to search for
 * @returns the author if found, otherwise undefined
 */
export const findAuthorById = (id: string): Author | undefined => 
  authors.find(author => author.id === id);

/**
 * Finds the first genre with the given ID.
 * @param id the genre ID to search for
 * @returns the genre if found, otherwise undefined
 */
export const findGenreById = (id: string): Genre | undefined => 
  genres.find(genre => genre.id === id);

/**
 * Finds the first book copy with the given ID.
 * @param id the book copy ID to search for
 * @returns the book copy if found, otherwise undefined
 */
export const findBookCopyById = (id: string): BookCopy | undefined => 
  bookCopies.find(copy => copy.id === id);

/**
 * Adds a new book to the end of the array of books in the in-memory storage.
 * @param book the book to add
 */
export const addBook = (book: Book): void => {
  books.push(book);
};

/**
 * Adds a new author to the end of the array of authors in the in-memory storage.
 * @param author the author to add
 */
export const addAuthor = (author: Author): void => {
  authors.push(author);
};

/**
 * Adds the given genre to the end of the array of genres in the in-memory storage.
 * @param genre the genre to add
 */
export const addGenre = (genre: Genre): void => {
  genres.push(genre);
};

/**
 * Adds the given book copy to the end of the array of book copies in the in-memory storage.
 * @param bookCopy the book copy to add
 */
export const addBookCopy = (bookCopy: BookCopy): void => {
  bookCopies.push(bookCopy);
};

/**
 * Finds and updates the first book, author, genre, or book copy with the given ID.
 * Returns a shallow copy of the updated item, or null if not found.
 * 
 * @param id the id of the book to update
 * @param updatedBook the new book, author, genre, or book copy data
 * @returns the updated book, author, genre, or book copy if found and updated, otherwise null
 */
export const updateBook = (id: string, updatedBook: Partial<Book>): Book | null => {
  const index = books.findIndex(book => book.id === id);
  if (index === -1) return null;
  
  books[index] = { ...books[index], ...updatedBook };
  return books[index];
};

/**
 * Modifies an existing author, genre, or book copy in the in-memory storage.
 * Returns a shallow copy of the updated item, or null if not found.
 * 
 * @param id the id of the author to update
 * @param updatedAuthor the new author, genre, or book copy data
 * @returns the updated author, genre, or book copy if found and updated, otherwise null
 */
export const updateAuthor = (id: string, updatedAuthor: Partial<Author>): Author | null => {
  const index = authors.findIndex(author => author.id === id);
  if (index === -1) return null;
  
  authors[index] = { ...authors[index], ...updatedAuthor };
  return authors[index];
};

/**
 * updates an existing genre in the in-memory storage.
 * 
 * @param id the id of the genre to update
 * @param updatedGenre the new genre name
 * @returns the updated genre if found and updated, otherwise null
 */
export const updateGenre = (id: string, updatedGenre: Partial<Genre>): Genre | null => {
  const index = genres.findIndex(genre => genre.id === id);
  if (index === -1) return null;
  
  genres[index] = { ...genres[index], ...updatedGenre };
  return genres[index];
};

/**
 * Finds the first book copy with the given ID and updates it.
 * 
 * @param id the id of the book copy to update
 * @param updatedBookCopy the new book copy data
 * @returns the updated book copy if found and updated, otherwise null
 */
export const updateBookCopy = (id: string, updatedBookCopy: Partial<BookCopy>): BookCopy | null => {
  const index = bookCopies.findIndex(copy => copy.id === id);
  if (index === -1) return null;
  
  bookCopies[index] = { ...bookCopies[index], ...updatedBookCopy };
  return bookCopies[index];
};

/**
 * Finds and deletes the first book with the given ID.
 * Also deletes all associated book copies. 
 * 
 * @param id the id of the book to delete
 * @returns true if the book was found and deleted, otherwise false
 */
export const deleteBook = (id: string): boolean => {
  const index = books.findIndex(book => book.id === id);
  if (index === -1) return false;
  
  bookCopies = bookCopies.filter(copy => copy.bookId !== id);
  books.splice(index, 1);
  return true;
};

/**
 * Finds and deletes the first author with the given ID.
 * 
 * @param id the id of the author to delete
 * @returns true if the author was found and deleted, otherwise false
 */
export const deleteAuthor = (id: string): boolean => {
  const index = authors.findIndex(author => author.id === id);
  if (index === -1) return false;
  
  authors.splice(index, 1);
  return true;
};

/**
 * Finds the first genre with the given ID and deletes it.
 * 
 * @param id the id of the genre to delete
 * @returns true if the genre was found and deleted, otherwise false
 */
export const deleteGenre = (id: string): boolean => {
  const index = genres.findIndex(genre => genre.id === id);
  if (index === -1) return false;
  
  genres.splice(index, 1);
  return true;
};

/**
 * Finds the first book copy with the given ID and deletes it.
 * 
 * @param id the id of the book copy to delete
 * @returns true if the book copy was found and deleted, otherwise false
 */
export const deleteBookCopy = (id: string): boolean => {
  const index = bookCopies.findIndex(copy => copy.id === id);
  if (index === -1) return false;
  
  bookCopies.splice(index, 1);
  return true;
};
