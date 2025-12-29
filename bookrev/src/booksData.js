import "./bookCard.css";
import img1984 from "./Images/1984.jpg";
import mobbyDick from "./Images/mobbydick.jpg";
import pride from "./Images/pride.jpg";
import thegreat from "./Images/theGreat.jpeg";
import TheChronicles from "./Images/TheChronicles.jpg";
import catcher from "./Images/thecatcher.png";
import mocking from "./Images/mockingBird.jpg";

const booksData = [
  { 
    id: 1,
    title: "1984", 
    author: "George Orwell", 
    genre: "Dystopian", 
    year: 1949,
    rating: 4.8,
    image: img1984,
    description: "A chilling tale of a totalitarian regime that watches and controls every aspect of life, warning of the dangers of absolute power."
  },
  { 
    id: 2,
    title: "Harry Potter", 
    author: "J.K. Rowling", 
    genre: "Fantasy", 
    year: 1997,
    rating: 4.9,
    image: "https://m.media-amazon.com/images/I/51UoqRAxwEL._SX331_BO1,204,203,200_.jpg",
    description: "The first magical adventure of a young wizard, Harry Potter, as he discovers Hogwarts School and battles dark forces."
  },
  { 
    id: 3,
    title: "The Hobbit", 
    author: "J.R.R. Tolkien", 
    genre: "Adventure", 
    year: 1937,
    rating: 4.7,
    image: "https://m.media-amazon.com/images/I/41aQPTCmeVL._SX331_BO1,204,203,200_.jpg",
    description: "Bilbo Baggins embarks on an epic journey through Middle-earth, facing dragons, trolls, and treasure beyond imagination."
  },
  { 
    id: 4,
    title: "The Great Gatsby", 
    author: "F. Scott Fitzgerald", 
    genre: "Classic", 
    year: 1925,
    rating: 4.4,
    image: thegreat,
    description: "A story of wealth, love, and the American Dream, as Jay Gatsby pursues his obsession with Daisy Buchanan."
  },
  { 
    id: 5,
    title: "Moby Dick", 
    author: "Herman Melville", 
    genre: "Adventure", 
    year: 1851,
    rating: 4.1,
    image: mobbyDick,
    description: "Captain Ahab’s obsessive quest for the legendary white whale, exploring humanity, revenge, and fate."
  },
  { 
    id: 6,
    title: "Pride and Prejudice", 
    author: "Jane Austen", 
    genre: "Romance", 
    year: 1813,
    rating: 4.6,
    image: pride,
    description: "Elizabeth Bennet navigates love, society, and family expectations in this timeless tale of romance and wit."
  },
  { 
    id: 7,
    title: "The Catcher in the Rye", 
    author: "J.D. Salinger", 
    genre: "Classic", 
    year: 1951,
    rating: 4.0,
    image: catcher,
    description: "Holden Caulfield recounts his struggles with adolescence, identity, and the phoniness of the adult world."
  },
  { 
    id: 8,
    title: "To Kill a Mockingbird", 
    author: "Harper Lee", 
    genre: "Classic", 
    year: 1960,
    rating: 4.9,
    image: mocking,
    description: "A moving story about racial injustice and moral growth in the American South, seen through young Scout Finch’s eyes."
  },
  { 
    id: 9,
    title: "The Lord of the Rings", 
    author: "J.R.R. Tolkien", 
    genre: "Fantasy", 
    year: 1954,
    rating: 4.9,
    image: "https://m.media-amazon.com/images/I/51EstVXM1UL._SX331_BO1,204,203,200_.jpg",
    description: "Frodo Baggins embarks on a perilous journey to destroy the One Ring and save Middle-earth from darkness."
  },
  { 
    id: 10,
    title: "The Chronicles of Narnia", 
    author: "C.S. Lewis", 
    genre: "Fantasy", 
    year: 1950,
    rating: 4.5,
    image: TheChronicles,
    description: "Four siblings discover the magical land of Narnia, where they face epic battles, talking animals, and destiny."
  }
];

export default booksData;

