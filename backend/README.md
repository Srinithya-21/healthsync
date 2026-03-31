# HealthSync Backend - Setup Instructions

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secure random string
- `OPENAI_API_KEY`: (Optional) Your OpenAI API key for chatbot

## Running the Backend

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

### Seed Sample Data
```bash
npm run seed
```

The backend will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify token

### User Profile
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update profile
- `PUT /api/user/nutrition-goals` - Update nutrition goals

### Fitness Tracking
- `POST /api/fitness/log` - Add workout
- `GET /api/fitness/logs` - Get all workouts
- `GET /api/fitness/stats` - Get fitness stats
- `PUT /api/fitness/log/:logId` - Update workout
- `DELETE /api/fitness/log/:logId` - Delete workout

### Nutrition Tracking
- `POST /api/nutrition/meal` - Add meal
- `GET /api/nutrition/meals` - Get meals
- `GET /api/nutrition/daily-summary` - Get daily summary
- `PUT /api/nutrition/meal/:logId` - Update meal
- `DELETE /api/nutrition/meal/:logId` - Delete meal

### Period Tracking
- `POST /api/period/log` - Add period log
- `GET /api/period/logs` - Get period logs
- `GET /api/period/predictions` - Get predictions
- `PUT /api/period/log/:logId` - Update period log
- `DELETE /api/period/log/:logId` - Delete period log

### Chatbot
- `POST /api/chatbot/message` - Send message
- `GET /api/chatbot/history` - Get chat history
- `DELETE /api/chatbot/history` - Clear history

### Skin Analysis
- `POST /api/skin/analyze` - Analyze skin
- `GET /api/skin/history` - Get analysis history
- `GET /api/skin/latest` - Get latest analysis
- `DELETE /api/skin/:analysisId` - Delete analysis

### Dashboard
- `GET /api/dashboard/data` - Get dashboard data
- `GET /api/dashboard/weekly-progress` - Get weekly progress
- `GET /api/dashboard/monthly-insights` - Get monthly insights

## Database Structure

The backend uses MongoDB with the following collections:
- `users` - User profiles and settings
- `fitnesslogs` - Workout records
- `nutritionlogs` - Meal records
- `periodtrackers` - Period/cycle information
- `chatmessages` - Chat history
- `skinanalysises` - Skin analysis results

All documents are indexed for optimal performance.
