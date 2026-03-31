# HealthSync Frontend - Setup Instructions

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update environment variables if needed:
- `VITE_API_URL`: Backend API URL (default: http://localhost:5000/api)

## Running the Frontend

### Development Server
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Project Structure

```
src/
├── components/       # Reusable components (Sidebar, Header, etc.)
├── pages/           # Page components (Dashboard, Fitness, Nutrition, etc.)
├── context/         # React Context (AuthContext)
├── services/        # API service calls
├── styles/          # Global CSS and Tailwind customization
└── App.jsx          # Main app component
```

## Features Implemented

- **Authentication**: Login/Signup with JWT
- **Dashboard**: Overview of all health metrics
- **Fitness Tracker**: Log workouts, track calories, view stats
- **Nutrition Tracker**: Log meals, track macros, daily summary
- **Period Tracker**: Log period/cycle, predict next period, track symptoms
- **AI Chatbot**: Health advice and fitness tips (mock responses)
- **Skin Analysis**: Upload images and get skin analysis (mock)
- **Profile Management**: Update personal info and goals

## Technology Stack

- **React 18**: UI library
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Styling framework
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **React Icons**: Icon library

## Demo Credentials

```
Email: sarah@example.com
Password: password123
```

## Tips

- All forms have validation
- API calls use interceptors for JWT token management
- Responsive design works on mobile and desktop
- Dark/Light mode support ready
- All data syncs with backend MongoDB

## Common Issues

**CORS Errors**: Make sure backend is running on port 5000
**API not found**: Check VITE_API_URL in .env matches backend URL
**Module not found**: Run `npm install` if dependencies are missing
