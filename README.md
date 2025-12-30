# BookNook - MERN Stack Application

A full-stack book library application built with React, Node.js, Express, and MongoDB.

## Project Structure

```
BookNook-main/
├── bookrev/          # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   └── utils/
│   └── package.json
├── server/           # Node.js/Express Backend
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
└── README.md
```

## Features

- ✅ User Registration and Authentication with password hashing
- ✅ Session-based login/logout
- ✅ CRUD operations for books
- ✅ User-specific authorization (users can only edit/delete their own books)
- ✅ Custom middleware for logging POST requests
- ✅ MongoDB database with Mongoose schemas
- ✅ Protected routes on frontend

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Installation

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the server directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/booknook
SESSION_SECRET=your-secret-key-change-this-in-production
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

4. Start the server:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd bookrev
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the bookrev directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the React app:
```bash
npm start
```

The app will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Check authentication status

### Books
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get a single book
- `POST /api/books` - Create a new book (requires authentication)
- `PUT /api/books/:id` - Update a book (requires authentication and ownership)
- `DELETE /api/books/:id` - Delete a book (requires authentication and ownership)

## Database Schema

### User Schema
- `username` (String, required, unique)
- `email` (String, required, unique)
- `password` (String, required, hashed with bcrypt)

### Book Schema
- `title` (String, required)
- `author` (String, required)
- `genre` (String, required)
- `year` (Number, required)
- `rating` (Number, 0-5)
- `image` (String, required)
- `description` (String)
- `createdBy` (ObjectId, reference to User, required)

## Security Features

1. **Password Hashing**: All passwords are hashed using bcryptjs before storage
2. **Session Management**: HTTP sessions with secure cookies
3. **Authorization**: Users can only update/delete their own books (enforced server-side)
4. **Custom Middleware**: POST request logging middleware tracks all successful POST requests

## Deployment

### Backend Deployment (Render.com)

1. Create a new Web Service on Render.com
2. Connect your GitHub repository
3. Set the following:
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Environment Variables**:
     - `MONGODB_URI` - Your MongoDB connection string
     - `SESSION_SECRET` - A secure random string
     - `NODE_ENV` - `production`
     - `FRONTEND_URL` - Your frontend URL


