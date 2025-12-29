const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const User = require('../models/User');
const { requireAuth } = require('../middleware/authMiddleware');

// Get all books (catalog + user's own books)
router.get('/', async (req, res) => {
  try {
    // Find the system catalog user
    const systemUser = await User.findOne({ username: 'system_catalog' });
    
    let query = {};
    
    if (req.session && req.session.userId) {
      // If user is logged in, show catalog books + their own books
      query = {
        $or: [
          { createdBy: systemUser._id },      // Catalog books
          { createdBy: req.session.userId }   // User's own books
        ]
      };
    } else {
      // If not logged in, only show catalog books
      query = { createdBy: systemUser._id };
    }
    
    const books = await Book.find(query).populate('createdBy', 'username').sort({ createdAt: -1 });
    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Error fetching books' });
  }
});

// Get single book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('createdBy', 'username');
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ error: 'Error fetching book' });
  }
});

// Create new book (requires authentication)
router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, author, genre, year, rating, image, description } = req.body;

    if (!title || !author || !genre || !year || !image) {
      return res.status(400).json({ error: 'Title, author, genre, year, and image are required' });
    }

    const book = new Book({
      title,
      author,
      genre,
      year,
      rating: rating || 0,
      image,
      description: description || '',
      createdBy: req.session.userId
    });

    await book.save();
    const populatedBook = await Book.findById(book._id).populate('createdBy', 'username');
    
    res.status(201).json(populatedBook);
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ error: 'Error creating book' });
  }
});

// Update book (requires authentication and ownership)
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { title, author, genre, year, rating, image, description } = req.body;

    // Find book and check ownership - CRITICAL: User can only update their own books
    const book = await Book.findOne({ 
      _id: req.params.id,
      createdBy: req.session.userId  // Authorization check: item's creator must match logged-in user
    });

    if (!book) {
      return res.status(404).json({ error: 'Book not found or you do not have permission to update it' });
    }

    // Update fields
    if (title) book.title = title;
    if (author) book.author = author;
    if (genre) book.genre = genre;
    if (year !== undefined) book.year = year;
    if (rating !== undefined) book.rating = rating;
    if (image) book.image = image;
    if (description !== undefined) book.description = description;

    await book.save();
    const populatedBook = await Book.findById(book._id).populate('createdBy', 'username');
    
    res.json(populatedBook);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ error: 'Error updating book' });
  }
});

// Delete book (requires authentication and ownership)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    // Find book and check ownership - CRITICAL: User can only delete their own books
    const book = await Book.findOne({ 
      _id: req.params.id,
      createdBy: req.session.userId  // Authorization check: item's creator must match logged-in user
    });

    if (!book) {
      return res.status(404).json({ error: 'Book not found or you do not have permission to delete it' });
    }

    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Error deleting book' });
  }
});

module.exports = router;