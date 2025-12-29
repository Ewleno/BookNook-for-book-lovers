import React, { useState } from "react";
import "./bookCard.css";
import { booksAPI } from "./utils/api";

export default function BookCard({ book, currentUserId, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: book.title,
    author: book.author,
    genre: book.genre,
    year: book.year,
    rating: book.rating,
    image: book.image,
    description: book.description,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Check if current user owns this book
  const isOwner = currentUserId && book.createdBy && (book.createdBy === currentUserId || book.createdBy._id === currentUserId);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await booksAPI.update(book._id, editForm);
      setIsEditing(false);
      if (onUpdate) onUpdate();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update book");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    setLoading(true);
    try {
      await booksAPI.delete(book._id);
      if (onDelete) onDelete();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete book");
      setLoading(false);
    }
  };

  if (isEditing) {
    return (
      <div className="book-card edit-mode">
        <h3>Edit Book</h3>
        {error && <div style={{ color: "red", marginBottom: "10px", fontSize: "14px" }}>{error}</div>}
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            placeholder="Title"
            value={editForm.title}
            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
            required
            style={{ width: "100%", marginBottom: "8px", padding: "6px" }}
          />
          <input
            type="text"
            placeholder="Author"
            value={editForm.author}
            onChange={(e) => setEditForm({ ...editForm, author: e.target.value })}
            required
            style={{ width: "100%", marginBottom: "8px", padding: "6px" }}
          />
          <input
            type="text"
            placeholder="Genre"
            value={editForm.genre}
            onChange={(e) => setEditForm({ ...editForm, genre: e.target.value })}
            required
            style={{ width: "100%", marginBottom: "8px", padding: "6px" }}
          />
          <input
            type="number"
            placeholder="Year"
            value={editForm.year}
            onChange={(e) => setEditForm({ ...editForm, year: parseInt(e.target.value) })}
            required
            style={{ width: "100%", marginBottom: "8px", padding: "6px" }}
          />
          <input
            type="number"
            placeholder="Rating (0-5)"
            min="0"
            max="5"
            step="0.1"
            value={editForm.rating}
            onChange={(e) => setEditForm({ ...editForm, rating: parseFloat(e.target.value) })}
            style={{ width: "100%", marginBottom: "8px", padding: "6px" }}
          />
          <input
            type="url"
            placeholder="Image URL"
            value={editForm.image}
            onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
            required
            style={{ width: "100%", marginBottom: "8px", padding: "6px" }}
          />
          <textarea
            placeholder="Description"
            value={editForm.description}
            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
            style={{ width: "100%", marginBottom: "8px", padding: "6px", minHeight: "60px" }}
          />
          <div style={{ display: "flex", gap: "8px" }}>
            <button type="submit" disabled={loading} style={{ flex: 1, padding: "8px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
              {loading ? "Saving..." : "Save"}
            </button>
            <button type="button" onClick={() => setIsEditing(false)} style={{ flex: 1, padding: "8px", backgroundColor: "#ccc", border: "none", borderRadius: "4px", cursor: "pointer" }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="book-card">
      <img src={book.image} alt={book.title} className="book-image" />
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">by {book.author}</p>
        <p className="book-genre">Genre: {book.genre}</p>
        <p className="book-year">Year: {book.year}</p>
        <p className="book-rating">⭐ {book.rating}/5</p>
        <p className="book-description">{book.description}</p>
        
        {/* Only show edit/delete buttons if user owns this book */}
        {isOwner && (
          <div style={{ marginTop: "10px", display: "flex", gap: "8px" }}>
            <button
              onClick={() => setIsEditing(true)}
              disabled={loading}
              style={{
                flex: 1,
                padding: "8px",
                backgroundColor: "#2196F3",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              style={{
                flex: 1,
                padding: "8px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        )}
        {error && <div style={{ color: "red", marginTop: "10px", fontSize: "14px" }}>{error}</div>}
      </div>
    </div>
  );
}