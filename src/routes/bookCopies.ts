import { Router } from 'express';
import {
  getAllBookCopies,
  getBookCopyById,
  createBookCopy,
  updateBookCopyById,
  deleteBookCopyById
} from '../controllers/bookCopiesControllers';

const router = Router();

/**
 * @swagger
 * /book-copies:
 *   get:
 *     summary: Get all book copies
 *     tags: [Book Copies]
 *     parameters:
 *       - in: query
 *         name: bookId
 *         schema:
 *           type: string
 *         description: Filter by book ID
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [available, unavailable, can be checkout, checked out]
 *         description: Filter by status
 *     responses:
 *       200:
 *         description: List of book copies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BookCopy'
 */
router.get('/', getAllBookCopies);

/**
 * @swagger
 * /book-copies/{id}:
 *   get:
 *     summary: Get book copy by ID
 *     tags: [Book Copies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book copy found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookCopy'
 *       404:
 *         description: Book copy not found
 */
router.get('/:id', getBookCopyById);

/**
 * @swagger
 * /book-copies:
 *   post:
 *     summary: Create a new book copy
 *     tags: [Book Copies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [bookId, imprint, status]
 *             properties:
 *               bookId:
 *                 type: string
 *               imprint:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [available, unavailable, can be checkout, checked out]
 *               dueBackDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Book copy created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookCopy'
 *       400:
 *         description: Invalid input
 */
router.post('/', createBookCopy);

/**
 * @swagger
 * /book-copies/{id}:
 *   put:
 *     summary: Update a book copy
 *     tags: [Book Copies]
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
 *             required: [bookId, imprint, status]
 *             properties:
 *               bookId:
 *                 type: string
 *               imprint:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [available, unavailable, can be checkout, checked out]
 *               dueBackDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Book copy updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookCopy'
 *       404:
 *         description: Book copy not found
 *       400:
 *         description: Invalid input
 */
router.put('/:id', updateBookCopyById);

/** 
 * @swagger
 * /book-copies/{id}:
 *   delete:
 *     summary: Delete book copy by ID
 *     tags: [Book Copies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Book copy deleted
 *       404:
 *         description: Book copy not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', deleteBookCopyById);

export default router;
