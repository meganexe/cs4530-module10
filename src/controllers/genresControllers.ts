import { Request, Response } from 'express';
import { 
  genres, 
  findGenreById, 
  addGenre, 
  updateGenre, 
  deleteGenre, 
  generateId 
} from '../data/storage';
import { Genre } from '../models';

/**
 * Retrieve all genres in the system.
 * 
 * @param res the response object to send the genres data
 */
export const getAllGenres = (_: Request, res: Response): void => {
  res.json(genres);
};

/**
 * Retrieve a specific genre by its ID.
 * if the genre is not found, respond with a 404 status code.
 * 
 * @param req the request object containing the genre ID in params
 * @param res the response object to send the genre data or error message
 */
export const getGenreById = (req: Request, res: Response): void => {
  const genre = findGenreById(req.params.id);
  if (!genre) {
    res.status(404).json({ error: 'Not Found', message: 'Genre not found' });
    return;
  }
  res.json(genre);
};

/**
 * creates a new genre with the provided name in the request body.
 * if the name is missing, respond with a 400 status code.
 * the newly created genre is returned with a 201 status code.
 * 
 * @param req the request object containing the genre name in body
 * @param res the response object to send the created genre data or error message
 */
export const createGenre = (req: Request, res: Response): void => {
  const { name } = req.body;
  
  if (!name) {
    res.status(400).json({ error: 'Bad Request', message: 'name is required' });
    return;
  }

  const newGenre: Genre = {
    id: generateId(),
    name
  };

  addGenre(newGenre);
  res.status(201).json(newGenre);
};

/**
 * Modifies an existing genre identified by its ID with the new name provided in the request body.
 * if the genre is not found, respond with a 404 status code.
 * if the name is missing, respond with a 400 status code.
 * the updated genre is returned in the response.
 * 
 * @param req the request object containing the genre ID in params and new name in body
 * @param res the response object to send the updated genre data or error message
 */
export const updateGenreById = (req: Request, res: Response): void => {
  const { name } = req.body;
  
  if (!name) {
    res.status(400).json({ error: 'Bad Request', message: 'name is required' });
    return;
  }

  const updatedGenre = updateGenre(req.params.id, { name });

  if (!updatedGenre) {
    res.status(404).json({ error: 'Not Found', message: 'Genre not found' });
    return;
  }

  res.json(updatedGenre);
};

/**
 * Deletes a genre identified by its ID.
 * if the genre is not found, respond with a 404 status code.
 * on successful deletion, respond with a 204 status code and no content. 
 * 
 * @param req the request object containing the genre ID in params
 * @param res the response object to send the status of deletion or error message
 */
export const deleteGenreById = (req: Request, res: Response): void => {
  const success = deleteGenre(req.params.id);
  if (!success) {
    res.status(404).json({ error: 'Not Found', message: 'Genre not found' });
    return;
  }

  res.status(204).send();
};
