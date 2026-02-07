# Heritage Insights

Heritage Insights is a full-stack web application for cultural heritage research. It provides researcher authentication, a research database search experience, and a data ingestion workflow for uploading reports. The frontend is built with React and Vite, while the backend uses Express and MongoDB via Mongoose.

## Features
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

```
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.zxtleno.mongodb.net/heritage?retryWrites=true&w=majority
VITE_API_BASE_URL=http://localhost:5000
```

Notes:
- MONGODB_URI is required for the backend.
- VITE_API_BASE_URL is used by the frontend in dev when the client is run separately.

## Setup

Install dependencies:
```
npm install
```

Start development server:
```
npm run dev
```

Build for production:
```
npm run build
```

Run production build:
```
npm start
```

## Frontend Routes
- / - Landing page
- /login - Researcher login
- /register - Researcher registration
- /dashboard - Mission Control dashboard
- /search - Research database search
- /upload - Data ingestion
- /insight/:id - Artifact insights

## Backend API

Authentication
- POST /api/auth/login
  Payload:
  - emailOrId
  - password

- POST /api/auth/register
  Payload:
  - fullName
  - email
  - password
  - mobileNumber
  - role
  - department
  - country

Research Uploads
- POST /api/research/upload
  Payload:
  - files[] { name, size, type }
  - uploaderName
  - uploaderEmail

## Documentation
See docs/PROJECT_DOCUMENTATION.md for full project details.

## Troubleshooting

MongoDB connection errors
- Add your IP to Atlas Network Access.
- Verify MONGODB_URI exists in .env.

Blank page or missing assets
- Restart npm run dev after changing Vite config.
- Confirm /src/main.tsx exists in client/src.
