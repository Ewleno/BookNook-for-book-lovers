require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./models/Book');
const User = require('./models/User');

// Your books data
const booksData = [
  { 
    title: "1984", 
    author: "George Orwell", 
    genre: "Dystopian", 
    year: 1949,
    rating: 4.8,
    image: "https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg",
    description: "A chilling tale of a totalitarian regime that watches and controls every aspect of life, warning of the dangers of absolute power."
  },
  { 
    title: "Harry Potter", 
    author: "J.K. Rowling", 
    genre: "Fantasy", 
    year: 1997,
    rating: 4.9,
    image: "https://m.media-amazon.com/images/I/51UoqRAxwEL._SX331_BO1,204,203,200_.jpg",
    description: "The first magical adventure of a young wizard, Harry Potter, as he discovers Hogwarts School and battles dark forces."
  },
  { 
    title: "The Hobbit", 
    author: "J.R.R. Tolkien", 
    genre: "Adventure", 
    year: 1937,
    rating: 4.7,
    image: "https://m.media-amazon.com/images/I/41aQPTCmeVL._SX331_BO1,204,203,200_.jpg",
    description: "Bilbo Baggins embarks on an epic journey through Middle-earth, facing dragons, trolls, and treasure beyond imagination."
  },
  { 
    title: "The Great Gatsby", 
    author: "F. Scott Fitzgerald", 
    genre: "Classic", 
    year: 1925,
    rating: 4.4,
    image: "https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg",
    description: "A story of wealth, love, and the American Dream, as Jay Gatsby pursues his obsession with Daisy Buchanan."
  },
  { 
    title: "Moby Dick", 
    author: "Herman Melville", 
    genre: "Adventure", 
    year: 1851,
    rating: 4.1,
    image: "https://m.media-amazon.com/images/I/71d5wo+-MuL._AC_UF1000,1000_QL80_.jpg",
    description: "Captain Ahab's obsessive quest for the legendary white whale, exploring humanity, revenge, and fate."
  },
  { 
    title: "Pride and Prejudice", 
    author: "Jane Austen", 
    genre: "Romance", 
    year: 1813,
    rating: 4.6,
    image: "https://m.media-amazon.com/images/I/71Q1tPupKjL._AC_UF1000,1000_QL80_.jpg",
    description: "Elizabeth Bennet navigates love, society, and family expectations in this timeless tale of romance and wit."
  },
  { 
    title: "The Catcher in the Rye", 
    author: "J.D. Salinger", 
    genre: "Classic", 
    year: 1951,
    rating: 4.0,
    image: "https://m.media-amazon.com/images/I/8125BDk3l9L._AC_UF1000,1000_QL80_.jpg",
    description: "Holden Caulfield recounts his struggles with adolescence, identity, and the phoniness of the adult world."
  },
  { 
    title: "To Kill a Mockingbird", 
    author: "Harper Lee", 
    genre: "Classic", 
    year: 1960,
    rating: 4.9,
    image: "https://m.media-amazon.com/images/I/81gepf1eMqL._AC_UF1000,1000_QL80_.jpg",
    description: "A moving story about racial injustice and moral growth in the American South, seen through young Scout Finch's eyes."
  },
  { 
    title: "The Lord of the Rings", 
    author: "J.R.R. Tolkien", 
    genre: "Fantasy", 
    year: 1954,
    rating: 4.9,
    image: "https://m.media-amazon.com/images/I/51EstVXM1UL._SX331_BO1,204,203,200_.jpg",
    description: "Frodo Baggins embarks on a perilous journey to destroy the One Ring and save Middle-earth from darkness."
  },
  { 
    title: "The Chronicles of Narnia", 
    author: "C.S. Lewis", 
    genre: "Fantasy", 
    year: 1950,
    rating: 4.5,
    image: "https://m.media-amazon.com/images/I/81XqkdPxx3L._AC_UF1000,1000_QL80_.jpg",
    description: "Four siblings discover the magical land of Narnia, where they face epic battles, talking animals, and destiny."
  }
];

// Connect to MongoDB and seed the database
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/booknook');
    console.log('✓ Connected to MongoDB');

    // Check if system user exists, if not create one
    let systemUser = await User.findOne({ username: 'system_catalog' });
    
    if (!systemUser) {
      systemUser = await User.create({
        username: 'system_catalog',
          email: 'system@booknook.com',
        password: 'system_catalog_password_do_not_use'
      });
      console.log('✓ Created system catalog user');
    } else {
      console.log('✓ System catalog user already exists');
    }

    // Clear existing books (optional - remove this line if you want to keep existing books)
    await Book.deleteMany({});
    console.log('✓ Cleared existing books');

    // Add createdBy field to all books
    const booksWithUser = booksData.map(book => ({
      ...book,
      createdBy: systemUser._id
    }));

    // Insert all books
    await Book.insertMany(booksWithUser);
    console.log(`✓ Successfully seeded ${booksData.length} books into the database!`);

    // Close the connection
    await mongoose.connection.close();
    console.log('✓ Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();