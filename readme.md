# Doctor Alliance Assignment for Engineering Intern
# Resume Portal

A modern web application for managing and tracking job application resumes. Built with React, TypeScript, Express.js and MySQL.

## Screenshots

### Login Screen
![Login Screen](https://i.ibb.co/tXQHnWn/Screenshot-2025-01-13-162840.png)
- Clean and modern login interface
- Toggle between login and registration
- Form validation with error messages
- Secure authentication with JWT

### Registration Screen
![Registration Screen](https://i.ibb.co/wNHwBhM/Screenshot-2025-01-13-163719.png)
- User-friendly registration form
- Password strength requirements
- Real-time validation feedback
- Smooth transition to login after successful registration

### Dashboard Overview
![Dashboard](https://i.ibb.co/xYZWsKR/Screenshot-2025-01-13-163314.png)
- Clean, modern dashboard layout
- Quick access to all features
- Responsive sidebar navigation
- User profile information
- Recent activity overview

### Resume Upload
![Resume Upload](https://i.ibb.co/nMwT9Fw/Screenshot-2025-01-13-163447.png)
Features:
- Drag and drop file upload
- File type validation (PDF only)
- File size limit (5MB)
- Upload progress indicator
- Success/error notifications
- Selected filename display

### Resume Management
![Resume Management](https://i.ibb.co/NKygqrn/Screenshot-2025-01-13-163612.png)
Features:
- List of all uploaded resumes
- Sort by date, name
- Quick actions (view, delete)
- PDF preview
- Upload date and submission date
- File information display

## Features

### Authentication
- 🔐 Secure JWT-based authentication
- 🚫 Protection against brute force attacks
- 🔒 Password hashing with bcrypt
- 🔄 Auto-logout on token expiration

### Resume Management
- 📤 Drag-and-drop file uploads
- 📋 PDF file validation
- 📊 Resume tracking
- 👀 Quick PDF preview

### User Interface
- 📱 Fully responsive design
- 🎨 Modern, clean aesthetics
- ⚡ Fast page transitions
- 🎯 Intuitive navigation
- 💫 Smooth animations

### Security
- 🔒 JWT authentication
- 🛡️ XSS protection
- 🚫 SQL injection prevention
- 📝 Input validation
- 🔐 Secure file handling

## Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router DOM** - Navigation
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Lucide React** - Icons
- **date-fns** - Date formatting

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MySQL** - Database
- **JWT** - Authentication
- **Multer** - File uploads
- **bcryptjs** - Password hashing

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MySQL (v8 or higher)
- Modern web browser

### Environment Setup

1. Create a `.env` file:
```env
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=resume_app
JWT_SECRET=your_jwt_secret
PORT=3000
```

### Installation Steps

1. Clone the repository:
```sh
   git clone https://github.com/patil-tanay/Doctor-Alliance-Assignment.git
   cd Doctor-Alliance-Assignment
   ```

2. Install dependencies:
```sh
npm install
```

3. Create database:
   
```sh
CREATE DATABASE doctorallaince_assignment;
```

4. Start the application:
```sh
npm run start
```

## Project Structure

```
resume-portal/
├── src/                    # Frontend source
│   ├── components/         # Reusable components
│   │   ├── auth/          # Authentication components
│   │   └── ui/            # UI components
│   ├── pages/             # Page components
│   │   ├── Login.tsx      # Login/Register page
│   │   └── Dashboard.tsx  # Main dashboard
│   ├── types/             # TypeScript types
│   └── lib/               # Utilities
├── server/                 # Backend source
│   ├── routes/            # API routes
│   ├── middleware/        # Express middleware
│   └── uploads/           # File storage
└── public/                # Static files
```

## API Documentation

### Authentication Endpoints

#### POST /api/register
Register a new user
```json
{
  "username": "string",
  "password": "string"
}
```

#### POST /api/login
Login user
```json
{
  "username": "string",
  "password": "string"
}
```

### Resume Endpoints

#### POST /api/resume
Upload resume (multipart/form-data)
- name: string
- submissionDate: date
- resume: File (PDF)

#### GET /api/resume
Get user's resumes
- Returns array of resume objects

#### DELETE /api/resume/:id
Delete resume by ID

## Security Implementation

### Authentication
- Passwords hashed using bcrypt (10 rounds)
- JWT tokens with 24-hour expiration
- Secure HTTP-only cookies

### File Upload Security
- File type validation
- Size limits
- Secure file storage
- Sanitized filenames

