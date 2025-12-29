# BookNook Backend Server

Express.js backend server for the BookNook MERN stack application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/booknook
SESSION_SECRET=your-secret-key-change-this
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

3. Start the server:
```bash
npm start
```

## Project Structure

- `models/` - Mongoose schemas (User, Book)
- `routes/` - Express route handlers (authRoutes, bookRoutes)
- `middleware/` - Custom middleware (authMiddleware, postLogger)
- `config/` - Configuration files (database connection)
- `server.js` - Main server file

## Key Features

- **Authentication**: Registration, login, logout with sessions
- **Authorization**: User-specific CRUD operations
- **Custom Middleware**: POST request logging
- **MongoDB Integration**: Mongoose ODM

