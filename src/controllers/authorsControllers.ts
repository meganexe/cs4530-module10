import { Request, Response } from 'express';
import { 
  authors, 
  findAuthorById, 
  addAuthor, 
  updateAuthor, 
  deleteAuthor, 
  generateId 
} from '../data/storage';
import { Author } from '../models';

/**
 * Returns a list of all authors in the system.
 * 
 * @param res - Express response object
 */
export const getAllAuthors = (_: Request, res: Response): void => {
  res.json(authors);
};

/**
 * Retrieves a single author by ID.
 * 
 * @param req the request object containing the author ID as a path parameter
 * @param res the response object to send the author data or an error message
 * @returns the author data if found, otherwise a 404 error response
 */
export const getAuthorById = (req: Request, res: Response): void => {
  const author = findAuthorById(req.params.id);
  if (!author) {
    res.status(404).json({ error: 'Not Found', message: 'Author not found' });
    return;
  }
  res.json(author);
};

/**
 * Creates a new author with author name, birth date, death date.
 * Author's first name and birth date are required fields.
 * An id is generated for the new author.
 * 
 * @param req the request object containing the author's first name, last name, birth date, and optional death date in the body
 * @param res the response object to send the created author data or an error message
 * @returns an HTTP 201 response with the created author data, or a 400 error response if required fields are missing
 */
export const createAuthor = (req: Request, res: Response): void => {
  const { firstName, lastName, birthDate, deathDate } = req.body;
  
  if (!firstName || !birthDate) {
    res.status(400).json({ error: 'Bad Request', message: 'firstName and birthDate are required' });
    return;
  }

  const newAuthor: Author = {
    id: generateId(),
    firstName,
    lastName,
    birthDate,
    deathDate
  };

  addAuthor(newAuthor);
  res.status(201).json(newAuthor);
};

/**
 * Updates an existing author's details by ID.
 * Author's first name and birth date are required fields.
 * 
 * @param req the request object containing the author ID as a path parameter and updated first name, last name, birth date, and optional death date in the body.
 * @param res the response object to send the updated author data or an error message
 * @returns the updated author data if found, otherwise a 404 error response; or a 400 error response if required fields are missing
 */
export const updateAuthorById = (req: Request, res: Response): void => {
  const { firstName, lastName, birthDate, deathDate } = req.body;
  
  if (!firstName || !birthDate) {
    res.status(400).json({ error: 'Bad Request', message: 'firstName and birthDate are required' });
    return;
  }

  const updatedAuthor = updateAuthor(req.params.id, {
    firstName,
    lastName,
    birthDate,
    deathDate
  });

  if (!updatedAuthor) {
    res.status(404).json({ error: 'Not Found', message: 'Author not found' });
    return;
  }

  res.json(updatedAuthor);
};

/**
 * Deletes an existing author by ID.
 * 
 * @param req the request object containing the author ID as a path parameter.
 * @param res the response object to send a success status or an error message.
 * @returns either a 204 No Content response if deletion was successful, or a 404 error response if the author was not found.
 */
export const deleteAuthorById = (req: Request, res: Response): void => {
  const success = deleteAuthor(req.params.id);
  if (!success) {
    res.status(404).json({ error: 'Not Found', message: 'Author not found' });
    return;
  }

  res.status(204).send();
};
