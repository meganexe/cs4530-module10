import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import authorsRouter from './routes/authors';
import genresRouter from './routes/genres';
import booksRouter from './routes/books';
import bookCopiesRouter from './routes/bookCopies';
import { initializeData } from './data/sampleData';

const app = express();
const PORT = process.env.PORT || 3000;

/**
 * uses the express.json() middleware to parse JSON request bodies.
 * This allows the server to handle incoming requests with JSON payloads.
 */
app.use(express.json());

/**
 * Configuration for Swagger/OpenAPI specification
 * 
 * This configuration defines the API metadata, server information,
 * and the data models (schemas) used in the API. 
 * The data models include Author, Genre, BookCopy, and Book,
 * each with their respective properties and validation rules.
 * 
 * The `apis` field points to the route files where the API endpoints are defined,
 * allowing Swagger to automatically generate documentation based on JSDoc comments.
 */
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library Management API',
      version: '1.0.0',
      description: 'A REST API for managing a library system with books, authors, genres, and book copies',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Author: {
          type: 'object',
          required: ['firstName', 'birthDate'],
          properties: {
            id: { type: 'string', example: 'auth123' },
            firstName: { type: 'string', example: 'Jane' },
            lastName: { type: 'string', example: 'Doe' },
            birthDate: { type: 'string', format: 'date', example: '1975-03-15' },
            deathDate: { type: 'string', format: 'date', example: '2020-12-01' }
          }
        },
        Genre: {
          type: 'object',
          required: ['name'],
          properties: {
            id: { type: 'string', example: 'gen123' },
            name: { type: 'string', example: 'Science Fiction' }
          }
        },
        BookCopy: {
          type: 'object',
          required: ['bookId', 'imprint', 'status'],
          properties: {
            id: { type: 'string', example: 'copy123' },
            bookId: { type: 'string', example: 'book123' },
            imprint: { type: 'string', example: 'First Edition 2023' },
            status: { 
              type: 'string', 
              enum: ['available', 'unavailable', 'can be checkout', 'checked out'],
              example: 'available'
            },
            dueBackDate: { type: 'string', format: 'date', example: '2024-01-15' }
          }
        },
        Book: {
          type: 'object',
          required: ['title', 'authorIds', 'genreIds', 'isbn', 'summary'],
          properties: {
            id: { type: 'string', example: 'book123' },
            title: { type: 'string', example: 'The Great Adventure' },
            authorIds: { 
              type: 'array', 
              items: { type: 'string' },
              minItems: 1,
              example: ['auth123', 'auth456']
            },
            genreIds: { 
              type: 'array', 
              items: { type: 'string' },
              minItems: 1,
              example: ['gen123']
            },
            isbn: { type: 'string', example: '978-3-16-148410-0' },
            summary: { type: 'string', example: 'An epic tale of adventure and discovery.' }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string' },
            message: { type: 'string' }
          }
        }
      }
    }
  },
  apis: [
    './src/routes/*.ts', // Path to the API route files
  ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

/**
 * Middleware to route requests to the appropriate routers.
 * Each router handles a specific resource: authors, genres, books, and book copies.
 */
app.use('/authors', authorsRouter);
app.use('/genres', genresRouter);
app.use('/books', booksRouter);
app.use('/book-copies', bookCopiesRouter);

/**
 * Middleware to serve the Swagger UI at the /api-docs endpoint.
 * This provides a user-friendly interface to explore and interact with the API documentation.
 */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

initializeData();

// Start server
app.listen(PORT, () => {
  console.log(`Library Management API server running on port ${PORT}`);
  console.log(`API documentation available at: http://localhost:${PORT}/api-docs`);
  console.log(`Sample endpoints:`);
  console.log(`GET  http://localhost:${PORT}/authors`);
  console.log(`GET  http://localhost:${PORT}/books`);
  console.log(`GET  http://localhost:${PORT}/genres`);
  console.log(`GET  http://localhost:${PORT}/book-copies`);
});

export default app;