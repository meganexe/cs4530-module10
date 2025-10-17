import { Request, Response } from 'express';
import { 
  bookCopies, 
  findBookCopyById,
  findBookById,
  addBookCopy, 
  updateBookCopy, 
  deleteBookCopy, 
  generateId 
} from '../data/storage';
import { BookCopy } from '../models';

/**
 * Retrieve all book copies, with optional filtering by bookId and status.
 * If the query parameters are provided, the results will be filtered accordingly.
 * Otherwise, all book copies will be returned.
 * 
 * @param req the request object containing query parameters for bookId and status
 * @param res the response object to send the filtered list of book copies
 */
export const getAllBookCopies = (req: Request, res: Response): void => {
  let filteredCopies = bookCopies;

  if (req.query.bookId) {
    filteredCopies = filteredCopies.filter(copy => copy.bookId === req.query.bookId);
  }

  if (req.query.status) {
    filteredCopies = filteredCopies.filter(copy => copy.status === req.query.status);
  }

  res.json(filteredCopies);
};

/**
 * Retrieve a single book copy by its ID.
 * If the book copy is not found, a 404 error is returned.
 * 
 * @param req the request object containing the book copy ID in the URL parameters
 * @param res the response object to send the book copy or an error message
 * @returns the book copy if found, otherwise a 404 error
 */
export const getBookCopyById = (req: Request, res: Response): void => {
  const bookCopy = findBookCopyById(req.params.id);
  if (!bookCopy) {
    res.status(404).json({ error: 'Not Found', message: 'Book copy not found' });
    return;
  }
  res.json(bookCopy);
};

/**
 * Create a new book copy.
 * Validates the request body to ensure required fields are present and valid.
 * If validation fails, a 400 error is returned.
 * Requires bookId, imprint, and status fields.
 * 
 * @param req the request object containing the book copy data in the body
 * @param res the response object to send the created book copy or an error message
 * @returns the created book copy if successful, otherwise a 400 error  
 */
export const createBookCopy = (req: Request, res: Response): void => {
  const { bookId, imprint, status, dueBackDate } = req.body;
  
  if (!bookId || !imprint || !status) {
    res.status(400).json({ 
      error: 'Bad Request', 
      message: 'bookId, imprint, and status are required' 
    });
    return;
  }

  if (!findBookById(bookId)) {
    res.status(400).json({ 
      error: 'Bad Request', 
      message: 'Invalid book ID' 
    });
    return;
  }

  const validStatuses = ['available', 'unavailable', 'can be checkout', 'checked out'];
  if (!validStatuses.includes(status)) {
    res.status(400).json({ 
      error: 'Bad Request', 
      message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` 
    });
    return;
  }

  const newBookCopy: BookCopy = {
    id: generateId(),
    bookId,
    imprint,
    status,
    dueBackDate
  };

  addBookCopy(newBookCopy);
  res.status(201).json(newBookCopy);
};

/**
 * Update an existing book copy by its ID.
 * Validates the request body to ensure required fields are present and valid.
 * If the book copy is not found, a 404 error is returned.
 * If validation fails, a 400 error is returned.
 * Requires bookId, imprint, and status fields.
 * 
 * @param req the request object containing the book copy ID in the URL parameters and book id, imprint, status, and dueBackDate in the body
 * @param res the response object to send the updated book copy or an error message
 * @returns the updated book copy if successful, otherwise a 400 or 404 error
 */
export const updateBookCopyById = (req: Request, res: Response): void => {
  const { bookId, imprint, status, dueBackDate } = req.body;
  
  if (!bookId || !imprint || !status) {
    res.status(400).json({ 
      error: 'Bad Request', 
      message: 'bookId, imprint, and status are required' 
    });
    return;
  }

  if (!findBookById(bookId)) {
    res.status(400).json({ 
      error: 'Bad Request', 
      message: 'Invalid book ID' 
    });
    return;
  }

  const validStatuses = ['available', 'unavailable', 'can be checkout', 'checked out'];
  if (!validStatuses.includes(status)) {
    res.status(400).json({ 
      error: 'Bad Request', 
      message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` 
    });
    return;
  }

  const updatedBookCopy = updateBookCopy(req.params.id, {
    bookId,
    imprint,
    status,
    dueBackDate
  });

  if (!updatedBookCopy) {
    res.status(404).json({ error: 'Not Found', message: 'Book copy not found' });
    return;
  }

  res.json(updatedBookCopy);
};

/**
 * Delete a book copy by its ID.
 * If the book copy is not found, a 404 error is returned.
 * 
 * @param req the request object containing the book copy ID in the URL parameters
 * @param res the response object to send a 204 status or an error message
 * @returns a 204 status if successful, otherwise a 404 error
 */
export const deleteBookCopyById = (req: Request, res: Response): void => {
  const success = deleteBookCopy(req.params.id);
  if (!success) {
    res.status(404).json({ error: 'Not Found', message: 'Book copy not found' });
    return;
  }

  res.status(204).send();
};
