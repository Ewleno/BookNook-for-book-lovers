# Project 2 Requirements Checklist

## ✅ Mandatory Requirements

### 1. Full MERN Stack
- ✅ React.js frontend (existing from Project 1)
- ✅ Node.js/Express.js backend (`server/` directory)
- ✅ MongoDB with Mongoose (`server/models/`)
- ✅ Mock data replaced with API calls (`bookrev/src/utils/api.js`)
- ✅ Login/Register pages connected to backend API

### 2. Database Design
- ✅ Mongoose schema with user reference field
  - `Book` schema includes `createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }`
  - Located in `server/models/Book.js`

### 3. Full Authentication and Sessions
- ✅ Secure user registration with password hashing (bcryptjs)
  - `server/models/User.js` - password hashing in pre-save hook
- ✅ Login/Logout functionality
  - `server/routes/authRoutes.js` - POST /api/auth/login, POST /api/auth/logout
- ✅ HTTP Sessions/Cookies for user state
  - `server/server.js` - express-session configuration
  - Sessions stored server-side with secure cookies

### 4. Server-Side Authorization (Anti-AI Measure)
- ✅ User-Specific CRUD with Mongoose query conditions
  - **Update Route** (`server/routes/bookRoutes.js` line 67-69):
    ```javascript
    const book = await Book.findOne({ 
      _id: req.params.id,
      createdBy: req.session.userId  // Authorization check
    });
    ```
  - **Delete Route** (`server/routes/bookRoutes.js` line 99-101):
    ```javascript
    const book = await Book.findOne({ 
      _id: req.params.id,
      createdBy: req.session.userId  // Authorization check
    });
    ```
  - Users can ONLY modify their own data

### 5. Custom Middleware & Logging (Anti-AI Measure)
- ✅ Custom Express middleware for POST request logging
  - `server/middleware/postLogger.js`
  - Logs timestamp and user ID for every successful POST request
  - Integrated into Express pipeline in `server/server.js` line 38

### 6. E2E Integration
- ✅ All data stored in MongoDB via Express API
- ✅ React components refactored to use API calls
  - `bookrev/src/HomePage.js` - fetches books from API
  - `bookrev/src/BookCard.js` - create/update/delete via API
  - Client-side filtering/sorting maintained on fetched data

### 7. Version Control
- ✅ GitHub repository structure ready
- ✅ `.gitignore` files configured
- ✅ Team members can contribute commits

### 8. MANDATORY DEPLOYMENT
- ✅ Deployment guide created (`DEPLOYMENT.md`)
- ✅ Instructions for Render.com Web Service (backend)
- ✅ Instructions for Render.com Static Site (frontend)
- ⚠️ **Action Required**: Deploy to Render.com and provide URLs

## Evaluation Rubric Alignment

### I. Server-Side Security & State (30 points)
- ✅ Session/Auth (15 pts): Sessions, password hashing, Login/Registration API
- ✅ User-Specific Authorization (15 pts): Correct Mongoose query logic in Update/Delete routes

### II. Custom Logic & Integration (30 points)
- ✅ Data Persistence & Schema (10 pts): Mongoose schema with user reference
- ✅ Custom Middleware (10 pts): POST logging middleware implemented
- ✅ E2E Data Flow (10 pts): React ↔ API communication, functional Login/Registration

### III. Collaboration & Deployment (25 points)
- ⚠️ Deployment & GitHub (15 pts): **Pending deployment to Render.com**
- ⚠️ Teamwork & Presentation (10 pts): **Team presentation required**

### IV. Submission & Professionalism (15 points)
- ✅ Code/API Quality (10 pts): Clean, commented code; logical API design
- ⚠️ AI Usage (5 pts): **Questionnaire submission required**

## File Structure

```
BookNook-main/
├── server/                    # Backend
│   ├── models/
│   │   ├── User.js           # User schema with password hashing
│   │   └── Book.js           # Book schema with createdBy reference
│   ├── routes/
│   │   ├── authRoutes.js     # Register, Login, Logout
│   │   └── bookRoutes.js    # CRUD with authorization
│   ├── middleware/
│   │   ├── authMiddleware.js # Authentication check
│   │   └── postLogger.js     # Custom POST logging middleware
│   ├── config/
│   │   └── database.js       # MongoDB connection
│   └── server.js             # Main server file
├── bookrev/                  # Frontend
│   ├── src/
│   │   ├── context/
│   │   │   └── AuthContext.js # Auth state management
│   │   ├── utils/
│   │   │   └── api.js        # API utility functions
│   │   ├── Login.js          # Connected to backend
│   │   ├── Register.js       # Connected to backend
│   │   ├── HomePage.js       # Fetches from API
│   │   └── BookCard.js       # Create/Edit/Delete via API
│   └── package.json          # Includes axios
└── README.md                 # Project documentation
```

## Next Steps

1. **Deploy to Render.com** (see `DEPLOYMENT.md`)
2. **Test all functionality** on deployed version
3. **Prepare presentation** demonstrating:
   - Register → Login → Create Book → Edit Own Book → Attempt Edit Other's Book → Logout
4. **Submit AI Usage Questionnaire**
5. **Ensure all team members have commits** in GitHub

## Testing Checklist

- [ ] Register new user
- [ ] Login with credentials
- [ ] Create a new book
- [ ] Edit own book (should work)
- [ ] Delete own book (should work)
- [ ] Attempt to edit another user's book (should fail with 404)
- [ ] Attempt to delete another user's book (should fail with 404)
- [ ] Logout
- [ ] Verify POST requests are logged in backend console
- [ ] Verify sessions persist across page refreshes

