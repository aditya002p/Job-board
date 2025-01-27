# Job Board Application

A full-stack job posting board built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- Company registration and authentication
- Email verification for new companies
- Job posting creation and management
- Automated email notifications to candidates
- Responsive design with Tailwind CSS
- JWT-based authentication
- Pagination for job listings

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn
- SMTP server access (for email functionality)

## Setup Instructions

### Server Setup

1. Navigate to the server directory:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory and add your configuration:

   ```
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/job-board
   JWT_SECRET=your_jwt_secret_key_here
   CLIENT_URL=http://localhost:5173
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_specific_password
   SMTP_FROM=your_email@gmail.com
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Client Setup

1. Navigate to the client directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the client directory:

   ```
   VITE_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
job-board/
├── client/               # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── context/     # Context providers
│   │   ├── utils/       # Utility functions
│   │   └── App.jsx      # Main app component
│   └── package.json
│
├── server/               # Node.js backend
│   ├── src/
│   │   ├── config/      # Configuration files
│   │   ├── controllers/ # Route controllers
│   │   ├── middleware/  # Custom middleware
│   │   ├── models/      # MongoDB models
│   │   ├── routes/      # API routes
│   │   ├── services/    # Business logic
│   │   └── app.js       # Express app
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication

- POST `/api/auth/register` - Register a new company
- POST `/api/auth/login` - Login
- GET `/api/auth/verify-email/:token` - Verify email
- POST `/api/auth/logout` - Logout

### Jobs

- POST `/api/jobs` - Create a new job posting
- GET `/api/jobs` - Get company's job postings

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- HTTP-only cookies
- CORS protection
- Helmet security headers
- Input validation and sanitization
- Error logging with Winston

## Error Handling

The application includes comprehensive error handling:

- Validation errors
- Authentication errors
- Database errors
- Email sending errors
- Generic error handling middleware

## License

MIT
