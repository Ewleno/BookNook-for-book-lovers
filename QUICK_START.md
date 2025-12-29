# Quick Start Guide - Get BookNook Running

Follow these steps to get your MERN stack application running locally.

## Step 1: Install Backend Dependencies

```bash
cd server
npm install
```

This will install:
- express
- mongoose
- bcryptjs
- express-session
- cors
- dotenv

## Step 2: Set Up MongoDB

### Option A: Local MongoDB
If you have MongoDB installed locally, it should work automatically on `mongodb://localhost:27017/booknook`

### Option B: MongoDB Atlas (Recommended - Free)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a free account
3. Create a new cluster (free tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/booknook`)
6. Replace `<password>` with your database password

## Step 3: Create Backend Environment File

Create `server/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/booknook
# OR use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/booknook
SESSION_SECRET=your-random-secret-key-here-change-this
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**Important**: Replace `your-random-secret-key-here-change-this` with a random string (you can generate one with: `openssl rand -base64 32`)

## Step 4: Install Frontend Dependencies

```bash
cd ../bookrev
npm install
```

This will install axios and other React dependencies.

## Step 5: Create Frontend Environment File

Create `bookrev/.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Step 6: Start the Backend Server

In a terminal, run:
```bash
cd server
npm start
```

You should see:
```
MongoDB Connected: ...
Server is running on port 5000
```

## Step 7: Start the Frontend

In a **new terminal**, run:
```bash
cd bookrev
npm start
```

The React app will open at `http://localhost:3000`

## Step 8: Test the Application

1. **Register**: Create a new account
2. **Login**: Sign in with your credentials
3. **Create Book**: Click "+ Add New Book" and fill in the form
4. **Edit Book**: Click "Edit" on your book (should work)
5. **Delete Book**: Click "Delete" on your book (should work)
6. **Check Backend Console**: You should see POST request logs like:
   ```
   [POST Logger] 2024-01-15T10:30:45.123Z - User ID: 507f1f77bcf86cd799439011 - Endpoint: /api/books - Status: 201
   ```

## Troubleshooting

### Backend won't start
- Check if MongoDB is running (if using local)
- Verify `.env` file exists in `server/` directory
- Check MongoDB connection string is correct

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check `REACT_APP_API_URL` in `bookrev/.env`
- Look for CORS errors in browser console

### MongoDB connection errors
- Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0` (for local testing)
- Check username/password in connection string
- Ensure cluster is running (not paused)

### Session/login issues
- Clear browser cookies
- Check `SESSION_SECRET` is set in backend `.env`
- Verify `withCredentials: true` in API calls (already set in `utils/api.js`)

## Next: Deploy to Render.com

Once everything works locally, follow `DEPLOYMENT.md` to deploy to production.

