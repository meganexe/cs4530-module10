import { Request, Response } from 'express';
import { 
  books, 
  findBookById, 
  findAuthorById,
  findGenreById,
  addBook, 
  updateBook, 
  deleteBook, 
  generateId 
} from '../data/storage';
import { Book } from '../models';

/**
 * Retrieve all books in the system.
 * 
 * @param res the response object containing the list of books
 */
export const getAllBooks = (_: Request, res: Response): void => {
  res.json(books);
};

/**
 * Retrieve a single book by its ID.
 * If the book is not found, respond with a 404 status code and an error message.
 * 
 * @param req the request object containing the book ID in the URL parameters
 * @param res the response object containing the book details or an error message
 * @returns the book details if found, otherwise a 404 error response
 */
export const getBookById = (req: Request, res: Response): void => {
  const book = findBookById(req.params.id);
  if (!book) {
    res.status(404).json({ error: 'Not Found', message: 'Book not found' });
    return;
  }
  res.json(book);
};

/**
 * Create a new book in the system.
 * Validates that all required fields are present and that authorIds and genreIds refer to existing authors and genres.
 * If validation fails, responds with a 400 status code and an error message.
 * title, authorIds, genreIds, isbn, and summary are required fields.
 * The authorIds and genreIds must be non-empty arrays containing valid IDs.
 * An authorId or genreId is considered valid if they exist in the system.
 * 
 * @param req the request object containing the book details in the body
 * @param res the response object containing the created book details or an error message
 * @returns the created book details if successful, otherwise a 400 error response
 */
export const createBook = (req: Request, res: Response): void => {
  const { title, authorIds, genreIds, isbn, summary } = req.body;
  
  if (!title || !authorIds || !genreIds || !isbn || !summary) {
    res.status(400).json({ 
      error: 'Bad Request', 
      message: 'title, authorIds, genreIds, isbn, and summary are required' 
    });
    return;
  }

  if (!Array.isArray(authorIds) || authorIds.length === 0) {
    res.status(400).json({ 
      error: 'Bad Request', 
      message: 'authorIds must be a non-empty array' 
    });
    return;
  }

  if (!Array.isArray(genreIds) || genreIds.length === 0) {
    res.status(400).json({ 
      error: 'Bad Request', 
      message: 'genreIds must be a non-empty array' 
    });
    return;
  }

  // Validate that all author IDs exist
  // this function should be extracted as it breaks single responsibility principle
  const invalidAuthorIds = authorIds.filter(id => !findAuthorById(id));
  if (invalidAuthorIds.length > 0) {
    res.status(400).json({ 
      error: 'Bad Request', 
      message: `Invalid author IDs: ${invalidAuthorIds.join(', ')}` 
    });
    return;
  }

  // Validate that all genre IDs exist
  // same here, should be extracted
  const invalidGenreIds = genreIds.filter(id => !findGenreById(id));
  if (invalidGenreIds.length > 0) {
    res.status(400).json({ 
      error: 'Bad Request', 
      message: `Invalid genre IDs: ${invalidGenreIds.join(', ')}` 
    });
    return;
  }

  const newBook: Book = {
    id: generateId(),
    title,
    authorIds,
    genreIds,
    isbn,
    summary
  };

  addBook(newBook);
  res.status(201).json(newBook);
};

/**
 * Update an existing book by its ID.
 * Validates that all required fields are present and that authorIds and genreIds refer to existing authors and genres.
 * If the book is not found, responds with a 404 status code and an error message.
 * If validation fails, responds with a 400 status code and an error message.
 * title, authorIds, genreIds, isbn, and summary are required fields.
 * The authorIds and genreIds must be non-empty arrays containing valid IDs.
 * An authorId or genreId is considered valid if they exist in the system.
 * The title, authorIds, genreIds, isbn, and summary fields will replace the existing values.
 * 
 * @param req the request object containing the book ID in the URL parameters and the updated book details in the body
 * @param res the response object containing the updated book details or an error message
 * @returns the updated book details if successful, otherwise a 400 error response for validation errors or a 404 error response if the book is not found
 */
export const updateBookById = (req: Request, res: Response): void => {
  const { title, authorIds, genreIds, isbn, summary } = req.body;
  
  if (!title || !authorIds || !genreIds || !isbn || !summary) {
    res.status(400).json({ 
      error: 'Bad Request', 
      message: 'title, authorIds, genreIds, isbn, and summary are required' 
    });
    return;
  }

  if (!Array.isArray(authorIds) || authorIds.length === 0) {
    res.status(400).json({ 
      error: 'Bad Request', 
      message: 'authorIds must be a non-empty array' 
    });
    return;
  }

  if (!Array.isArray(genreIds) || genreIds.length === 0) {
    res.status(400).json({ 
      error: 'Bad Request', 
      message: 'genreIds must be a non-empty array' 
    });
    return;
  }

  // Validate that all author IDs exist
  // this function should be extracted as it breaks single responsibility principle
  const invalidAuthorIds = authorIds.filter(id => !findAuthorById(id));
  if (invalidAuthorIds.length > 0) {
    res.status(400).json({ 
      error: 'Bad Request', 
      message: `Invalid author IDs: ${invalidAuthorIds.join(', ')}` 
    });
    return;
  }

  // Validate that all genre IDs exist
  // same here, should be extracted
  const invalidGenreIds = genreIds.filter(id => !findGenreById(id));
  if (invalidGenreIds.length > 0) {
    res.status(400).json({ 
      error: 'Bad Request', 
      message: `Invalid genre IDs: ${invalidGenreIds.join(', ')}` 
    });
    return;
  }

  const updatedBook = updateBook(req.params.id, {
    title,
    authorIds,
    genreIds,
    isbn,
    summary
  });

  if (!updatedBook) {
    res.status(404).json({ error: 'Not Found', message: 'Book not found' });
    return;
  }

  res.json(updatedBook);
};

/**
 * Deletes a book by its ID.
 * If the book is not found, responds with a 404 status code and an error message.
 * On successful deletion, responds with a 204 status code and no content.
 * 
 * @param req the request object containing the book ID in the URL parameters
 * @param res the response object indicating success or failure of the deletion
 * @returns a status code of 204 if successful, otherwise a 404 error response if the book is not found
 */
export const deleteBookById = (req: Request, res: Response): void => {
  const success = deleteBook(req.params.id);
  if (!success) {
    res.status(404).json({ error: 'Not Found', message: 'Book not found' });
    return;
  }

  res.status(204).send();
};
