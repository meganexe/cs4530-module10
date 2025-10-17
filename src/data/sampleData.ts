import { Author, Genre, Book, BookCopy } from '../models';
import { addAuthor, addGenre, addBook, addBookCopy } from './storage';

export const initializeData = (): void => {
  // Sample authors
  const author1: Author = {
    id: 'auth1',
    firstName: 'Isaac',
    lastName: 'Asimov',
    birthDate: '1920-01-02',
    deathDate: '1992-04-06'
  };
  
  const author2: Author = {
    id: 'auth2',
    firstName: 'Ursula',
    lastName: 'K. Le Guin',
    birthDate: '1929-10-21',
    deathDate: '2018-01-22'
  };

  addAuthor(author1);
  addAuthor(author2);

  // Sample genres
  const genre1: Genre = { id: 'gen1', name: 'Science Fiction' };
  const genre2: Genre = { id: 'gen2', name: 'Fantasy' };
  
  addGenre(genre1);
  addGenre(genre2);

  // Sample book
  const book1: Book = {
    id: 'book1',
    title: 'Foundation',
    authorIds: ['auth1'],
    genreIds: ['gen1'],
    isbn: '978-0-553-29335-4',
    summary: 'The first book in the Foundation series by Isaac Asimov.'
  };

  addBook(book1);

  // Sample book copy
  const copy1: BookCopy = {
    id: 'copy1',
    bookId: 'book1',
    imprint: 'First Edition 1951',
    status: 'available'
  };

  addBookCopy(copy1);
  
  console.log('Sample data initialized successfully');
};
