# Heritage Insights Project Documentation

## Overview
Heritage Insights is a full-stack web application for cultural heritage research. It provides authentication, a research database search experience, and a data ingestion workflow for uploading reports. The frontend is built with React and Vite, while the backend uses Express and MongoDB via Mongoose.

## Key Features
- Researcher authentication (login and registration)
- Research database search and artifact insights
- Data ingestion workflow with file metadata saved to MongoDB
- Responsive UI with reusable component library

## Tech Stack
- Frontend: React, Vite, Tailwind CSS, Radix UI, Wouter
- Backend: Node.js, Express
- Database: MongoDB Atlas (Mongoose ODM)
- Validation: Zod, React Hook Form

## Project Structure
- client/ - React app
- server/ - Express API
- shared/ - Mongoose models and shared types
- docs/ - Project documentation
- dist/ - Production build output

## Environment Variables
Create a .env file in the project root:

MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.zxtleno.mongodb.net/heritage?retryWrites=true&w=majority
VITE_API_BASE_URL=http://localhost:5000

Notes:
- MONGODB_URI is required for the backend.
- VITE_API_BASE_URL is used by the frontend in dev when the client is run separately.

## Install and Run

1) Install dependencies
npm install

2) Start development server
npm run dev

This runs the Express server and Vite middleware on port 5000.

3) Build for production
npm run build

4) Run production build
npm start

## Frontend Routes
- / - Landing page
- /login - Researcher login
- /register - Researcher registration
- /dashboard - Mission Control dashboard
- /search - Research database search
- /upload - Data ingestion
- /insight/:id - Artifact insights

## Backend API Endpoints

Authentication
- POST /api/auth/login
  Payload:
    { emailOrId, password }
  Response:
    { user, message }

- POST /api/auth/register
  Payload:
    { fullName, email, password, mobileNumber, role, department, country }
  Response:
    { user, message }

Research Uploads
- POST /api/research/upload
  Payload:
    { files, uploaderName, uploaderEmail }
  files[]:
    { name, size, type }
  Response:
    { id, message }

## Data Models

User (MongoDB)
- username (string, required, unique)
- password (string, required, hashed)
- fullName (string)
- email (string)
- mobileNumber (string)
- role (Student | Professor | Historian)
- department (string)
- country (string)
- createdAt, updatedAt

ResearchReport (MongoDB collection: heritage)
- files[]
  - name (string)
  - size (number)
  - type (string)
- uploaderName (string)
- uploaderEmail (string)
- createdAt, updatedAt

## Authentication Flow
- Registration hashes passwords using bcrypt.
- Login supports both hashed and legacy plaintext passwords.
- On successful login or registration, user data is stored in localStorage for UI personalization.

## Upload Flow
- User selects files on the Data Ingestion page.
- Client sends file metadata to /api/research/upload.
- Backend saves a ResearchReport document to MongoDB.

## Development Notes
- The server runs Vite in middleware mode for development.
- If MongoDB connection fails, the server will not start.
- Ensure Atlas IP whitelist allows your current machine.

## Troubleshooting

MongoDB connection errors
- Add your IP to Atlas Network Access.
- Verify MONGODB_URI is in .env.

Blank page or missing assets
- Restart npm run dev after changing Vite config.
- Confirm /src/main.tsx exists in client/src.

## Future Enhancements
- File content storage (GridFS or cloud storage)
- Role-based access control
- Session management and refresh tokens
- Advanced search indexing
