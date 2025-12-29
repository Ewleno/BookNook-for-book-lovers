# Deployment Guide - BookNook MERN Stack Application

This guide will help you deploy both the frontend and backend to Render.com.

## Prerequisites

1. GitHub account with your repository pushed
2. Render.com account
3. MongoDB Atlas account (or use Render's MongoDB service)

## Step 1: Set Up MongoDB Database

### Option A: MongoDB Atlas (Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist IP addresses (use `0.0.0.0/0` for Render.com)
5. Get your connection string (format: `mongodb+srv://username:password@cluster.mongodb.net/booknook`)

### Option B: Render MongoDB

1. In Render dashboard, create a new MongoDB service
2. Copy the connection string

## Step 2: Deploy Backend (Node.js/Express API)

1. **Create New Web Service**
   - Go to Render dashboard
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure the Service**
   - **Name**: `booknook-api` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Root Directory**: Leave empty (or set to repository root)

3. **Set Environment Variables**
   ```
   PORT=10000
   MONGODB_URI=your-mongodb-connection-string
   SESSION_SECRET=generate-a-random-secure-string-here
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-url.onrender.com
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Copy your backend URL (e.g., `https://booknook-api.onrender.com`)

## Step 3: Deploy Frontend (React Static Site)

1. **Create New Static Site**
   - Go to Render dashboard
   - Click "New +" → "Static Site"
   - Connect your GitHub repository

2. **Configure the Site**
   - **Name**: `booknook-frontend` (or your preferred name)
   - **Build Command**: `cd bookrev && npm install && npm run build`
   - **Publish Directory**: `bookrev/build`

3. **Set Environment Variables**
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com/api
   ```
   Replace `your-backend-url` with the actual backend URL from Step 2.

4. **Deploy**
   - Click "Create Static Site"
   - Wait for deployment to complete
   - Copy your frontend URL (e.g., `https://booknook-frontend.onrender.com`)

## Step 4: Update Backend CORS Configuration

After deploying the frontend, update the backend environment variable:
- Go to your backend service on Render
- Update `FRONTEND_URL` to match your frontend URL
- Redeploy the backend

## Step 5: Test the Deployment

1. Visit your frontend URL
2. Register a new account
3. Create a book
4. Test edit/delete functionality
5. Test logout/login

## Troubleshooting

### Backend Issues

- **Connection Refused**: Check MongoDB connection string and IP whitelist
- **CORS Errors**: Verify `FRONTEND_URL` environment variable matches your frontend URL
- **Session Issues**: Ensure `SESSION_SECRET` is set and `NODE_ENV=production`

### Frontend Issues

- **API Calls Failing**: Verify `REACT_APP_API_URL` is set correctly
- **Build Failures**: Check that all dependencies are in `package.json`
- **404 Errors**: Ensure `Publish Directory` is set to `bookrev/build`

### Common Environment Variable Mistakes

- Don't include trailing slashes in URLs
- Use `https://` for production URLs
- Ensure variable names match exactly (case-sensitive)

## Security Notes

1. **Never commit `.env` files** to Git
2. **Use strong SESSION_SECRET** (generate with: `openssl rand -base64 32`)
3. **Enable HTTPS** (Render does this automatically)
4. **Keep MongoDB credentials secure**

## Monitoring

- Check Render logs for errors
- Monitor MongoDB Atlas for connection issues
- Use browser DevTools Network tab to debug API calls

## Cost

- Render free tier: 750 hours/month per service
- MongoDB Atlas free tier: 512MB storage
- Both services may spin down after inactivity (free tier)

## Next Steps

1. Set up custom domains (optional)
2. Configure auto-deploy from main branch
3. Set up monitoring and alerts
4. Consider upgrading for production use

