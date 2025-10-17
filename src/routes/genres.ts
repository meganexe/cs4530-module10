import { Router } from 'express';
import {
  getAllGenres,
  getGenreById,
  createGenre,
  updateGenreById,
  deleteGenreById
} from '../controllers/genresControllers';

const router = Router();

/**
 * @swagger
 * /genres:
 *   get:
 *     summary: Get all genres
 *     tags: [Genres]
 *     responses:
 *       200:
 *         description: List of genres
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Genre'
 */
router.get('/', getAllGenres);

/**
 * @swagger
 * /genres/{id}:
 *   get:
 *     summary: Get genre by ID
 *     tags: [Genres]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Genre found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       404:
 *         description: Genre not found
 */
router.get('/:id', getGenreById);

/**
 * @swagger
 * /genres:
 *   post:
 *     summary: Create a new genre
 *     tags: [Genres]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Genre created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       400:
 *         description: Invalid input
 */
router.post('/', createGenre);

/**
 * @swagger
 * /genres/{id}:
 *   put:
 *     summary: Update a genre
 *     tags: [Genres]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Genre updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       404:
 *         description: Genre not found
 */
router.put('/:id', updateGenreById);

/** 
 * @swagger
 * /genres/{id}:
 *   delete:
 *     summary: Delete genre by ID
 *     tags: [Genres]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Genre deleted
 *       404:
 *         description: Genre not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', deleteGenreById);

export default router;
