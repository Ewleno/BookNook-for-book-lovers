import React, { useState, useEffect } from "react";
import BookCard from "./BookCard";
import "./HomePage.css";
import { useAuth } from "./context/AuthContext";
import { booksAPI } from "./utils/api";

// AddBookButton component
function AddBookButton({ onBookAdded }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
    rating: 0,
    image: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await booksAPI.create(formData);
      setFormData({
        title: "",
        author: "",
        genre: "",
        year: "",
        rating: 0,
        image: "",
        description: "",
      });
      setShowForm(false);
      if (onBookAdded) onBookAdded();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create book");
    } finally {
      setLoading(false);
    }
  };

  if (showForm) {
    return (
      <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
        <h3>Add New Book</h3>
        {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title *"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          />
          <input
            type="text"
            placeholder="Author *"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            required
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          />
          <input
            type="text"
            placeholder="Genre *"
            value={formData.genre}
            onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
            required
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          />
          <input
            type="number"
            placeholder="Year *"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
            required
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          />
          <input
            type="number"
            placeholder="Rating (0-5)"
            min="0"
            max="5"
            step="0.1"
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          />
          <input
            type="url"
            placeholder="Image URL *"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            required
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            style={{ width: "100%", marginBottom: "10px", padding: "8px", minHeight: "80px" }}
          />
          <div style={{ display: "flex", gap: "10px" }}>
            <button type="submit" disabled={loading} style={{ padding: "10px 20px", flex: 1, backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
              {loading ? "Adding..." : "Add Book"}
            </button>
            <button type="button" onClick={() => setShowForm(false)} style={{ padding: "10px 20px", flex: 1, backgroundColor: "#ccc", border: "none", borderRadius: "4px", cursor: "pointer" }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <button 
      onClick={() => setShowForm(true)}
      style={{ 
        padding: "12px 24px", 
        backgroundColor: "#4CAF50", 
        color: "white", 
        border: "none", 
        borderRadius: "4px", 
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold"
      }}
    >
      + Add New Book
    </button>
  );
}

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortType, setSortType] = useState("title");
  const { user } = useAuth();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await booksAPI.getAll();
      setBooks(data);
      setError("");
    } catch (err) {
      console.error("Error fetching books:", err);
      setError("Failed to load books. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Get all unique genres from books for the dropdown
  const genres = ["All", ...new Set(books.map((book) => book.genre))];

  // Filter + Sort Books
  const filteredBooks = books
    .filter((book) =>
      book.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
      (selectedGenre === "All" || book.genre === selectedGenre)
    )
    .sort((a, b) => {
      // ⭐ Sort by Title
      if (sortType === "title") return a.title.localeCompare(b.title);

      // ⭐ Sort by Year
      if (sortType === "year") return a.year - b.year;

      // ⭐ Sort by Rating (highest → lowest)
      if (sortType === "rating") return (b.rating ?? 0) - (a.rating ?? 0);

      return 0;
    });

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>Loading books...</h1>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Library</h1>
      {user && (
        <p style={{ textAlign: "center", color: "#666" }}>
          Welcome, {user.username}!
        </p>
      )}
      {error && (
        <div style={{ color: "red", textAlign: "center", marginBottom: "20px" }}>
          {error}
        </div>
      )}

      {/* Add Book Button */}
      {user && (
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <AddBookButton onBookAdded={fetchBooks} />
        </div>
      )}

      {/* Filters + Sort */}
      <div className="controls">
        {/* Search by Title */}
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />

        {/* Filter by Genre */}
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          {genres.map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        {/* Sort Options */}
        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="title">Sort by Title</option>
          <option value="year">Sort by Year</option>
          <option value="rating">Sort by Rating ⭐</option>
        </select>
      </div>

      {/* Book List */}
      <div className="books-container">
        {filteredBooks.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "40px" }}>
            No books found. {user && "Create your first book!"}
          </p>
        ) : (
          filteredBooks.map((book) => (
            <BookCard 
              key={book._id || book.id} 
              book={book} 
              currentUserId={user?._id}
              onUpdate={fetchBooks}
              onDelete={fetchBooks}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Home;