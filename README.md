# Document Optimizer - AI-Powered Document Tools

A full-stack document optimization platform with AI-powered tools built with Next.js frontend and Node.js backend.

## Features

### AI-Powered Services
- **AI Text Humanizer** - Transform AI-generated content into natural, human-like text
- **Prompt Optimizer** - Enhance your AI prompts for better, more accurate results
- **Readability Analyzer** - Analyze and improve content readability scores
- **Keyword Density Checker** - Optimize content for SEO with keyword analysis

### Authentication & Security
- User Registration with Client-side & Server-side Validation
- JWT Token-based Authentication
- Password Encryption with bcrypt
- Protected Routes & Dashboard
- Real-time Backend Health Monitoring

## Tech Stack

**Frontend (Next.js):**
- Next.js 16 with App Router
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Recharts (dashboard charts)
- React Hot Toast (notifications)
- Axios (API calls)

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- bcrypt for password hashing
- JWT for authentication
- express-validator for validation

## Project Structure

```
Project/
├── BackEnd-Project/              # Node.js Backend
│   ├── models/User.js            # User MongoDB Model
│   ├── myFiles/
│   │   ├── register.js           # Registration API
│   │   ├── auth.js               # Login API
│   │   └── users.js              # Users API
│   ├── utils/                    # Validation utilities
│   ├── db.js                     # Database connection
│   ├── index.js                  # Main server file
│   └── package.json
│
├── frontend-nextjs/              # Next.js Frontend (NEW)
│   ├── src/
│   │   ├── app/                  # App Router pages
│   │   │   ├── page.tsx          # Home page
│   │   │   ├── login/            # Login page
│   │   │   ├── signup/           # Signup page
│   │   │   ├── dashboard/        # User dashboard
│   │   │   ├── services/         # Service pages
│   │   │   │   ├── humanizer/    # AI Humanizer
│   │   │   │   ├── prompt-optimizer/
│   │   │   │   ├── readability/
│   │   │   │   └── keyword-checker/
│   │   │   ├── about/
│   │   │   └── contact/
│   │   ├── components/           # Reusable components
│   │   ├── contexts/             # React contexts (Auth)
│   │   ├── services/             # API services
│   │   └── utils/                # Utility functions
│   ├── package.json
│   └── next.config.ts
│
└── FrontEnd-React-Assignment-1/  # Legacy React Frontend (Vite)
```

## Installation & Setup

### Backend Setup
```bash
cd BackEnd-Project
npm install
node index.js
```

### Frontend Setup (Next.js - Recommended)
```bash
cd frontend-nextjs
npm install
npm run dev
```

### Legacy Frontend Setup (React/Vite)
```bash
cd FrontEnd-React-Assignment-1
npm install
npm run dev
```

## Environment Variables

### Backend (.env)
```env
MONGO_URI=mongodb://localhost:27017/myDBTest
JWT_SECRET=your-secret-key-here
PORT=5000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
NEXT_PUBLIC_API_TIMEOUT=10000
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register` | User registration |
| POST | `/api/login` | User login |
| GET | `/api/users` | Get all users |
| GET | `/health` | Server health check |

## Validation Features

### Client-side Validation
- First/Last name: Letters only, 2-35 characters
- Email: Valid email format
- Password: Minimum 6 characters
- Confirm password matching
- Terms agreement required

### Server-side Validation
- Express-validator for input validation
- Duplicate email prevention
- Password encryption with bcrypt
- Structured error responses

## Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with hero section |
| `/services` | All services overview |
| `/services/humanizer` | AI Text Humanizer tool |
| `/services/prompt-optimizer` | Prompt Optimizer tool |
| `/services/readability` | Readability Analyzer tool |
| `/services/keyword-checker` | Keyword Density Checker |
| `/login` | User login |
| `/signup` | User registration |
| `/dashboard` | User dashboard (protected) |
| `/about` | About page |
| `/contact` | Contact page |
| `/forgot-password` | Password recovery |

## Authentication Flow

1. User registers -> Data saved to MongoDB -> Redirect to login
2. User logs in -> JWT token generated -> Stored in localStorage
3. Protected routes check token for authentication
4. Dashboard displays user stats and quick actions

## UI Features

- Modern gradient design with Tailwind CSS
- Smooth animations with Framer Motion
- Responsive design for all devices
- Interactive charts on dashboard
- Toast notifications for user feedback
- Health badge showing backend status

## Dashboard Features

- Welcome message with user name
- Statistics cards (documents, humanized texts, etc.)
- Quick action buttons to all services
- Weekly usage charts
- Service distribution bar chart
- Recent activity feed

## Author

Created for AWD Course - 5th Semester Project

## License

This project is for educational purposes.
