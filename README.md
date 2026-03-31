# HealthSync - Complete Health Tracking Application

A modern, full-stack health tracking application that combines fitness, nutrition, period tracking, and AI-powered health advice.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Setup](#database-setup)
- [Deployment](#deployment)

## ✨ Features

### 🔐 Authentication
- User signup and login with JWT authentication
- Secure password hashing with bcryptjs
- Protected routes and API endpoints

### 💪 Fitness Tracker
- Log workouts (type, duration, calories burned, distance)
- View workout history
- Track fitness statistics and progress
- Different exercise types supported

### 🥗 Nutrition Tracker
- Log meals with detailed nutrition info
- Track daily calories and macros (protein, carbs, fats)
- Daily nutrition summary and progress bars
- Set personal nutrition goals

### 📅 Period Tracker
- Track menstrual cycle dates
- Predict next period and ovulation dates
- Log symptoms and mood
- Track flow type and intensity
- Calendar view for cycle awareness

### 🤖 AI Chatbot
- Get health, fitness, and nutrition advice
- Chat interface with message history
- Context-aware responses (currently using mock responses)
- Clear chat history option

### 📸 Skin Analysis
- Upload images for skin analysis
- Get recommendations for detected concerns
- Track skin analysis history
- Support for acne, dryness, sensitivity, and more

### 📊 Dashboard
- Comprehensive overview of all metrics
- Calorie balance visualization
- Weekly progress tracking
- Monthly insights and analytics
- Quick action buttons for logging

### 👤 Profile Management
- Update personal information
- Set fitness and nutrition goals
- Configure period tracking preferences
- Theme preferences (light/dark)

## 🛠 Tech Stack

### Backend
- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose** ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Axios** for HTTP requests

### Frontend
- **React 18** with **Vite**
- **React Router** for navigation
- **Tailwind CSS** for styling
- **React Icons** for UI icons
- **Chart.js** for data visualization (ready to use)

### Database
- **MongoDB** (local or MongoDB Atlas)

## 📁 Project Structure

```
healthsync/
│
├── backend/
│   ├── models/                 # Mongoose schemas
│   │   ├── User.js
│   │   ├── FitnessLog.js
│   │   ├── NutritionLog.js
│   │   ├── PeriodTracker.js
│   │   ├── ChatMessage.js
│   │   └── SkinAnalysis.js
│   │
│   ├── routes/                 # API routes
│   │   ├── auth.js
│   │   ├── user.js
│   │   ├── fitness.js
│   │   ├── nutrition.js
│   │   ├── period.js
│   │   ├── chatbot.js
│   │   ├── skinAnalysis.js
│   │   └── dashboard.js
│   │
│   ├── controllers/            # Route handlers
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── fitnessController.js
│   │   ├── nutritionController.js
│   │   ├── periodController.js
│   │   ├── chatbotController.js
│   │   ├── skinAnalysisController.js
│   │   └── dashboardController.js
│   │
│   ├── middleware/
│   │   └── auth.js             # JWT verification middleware
│   │
│   ├── scripts/
│   │   └── seedData.js         # Sample data population
│   │
│   ├── server.js               # Main server file
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Sidebar.jsx
    │   │   ├── Header.jsx
    │   │   ├── StatCard.jsx
    │   │   └── ProgressChart.jsx
    │   │
    │   ├── pages/
    │   │   ├── LoginPage.jsx
    │   │   ├── SignupPage.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── FitnessPage.jsx
    │   │   ├── NutritionPage.jsx
    │   │   ├── PeriodPage.jsx
    │   │   ├── ChatbotPage.jsx
    │   │   ├── SkinAnalysisPage.jsx
    │   │   └── ProfilePage.jsx
    │   │
    │   ├── context/
    │   │   └── AuthContext.jsx  # Global auth state
    │   │
    │   ├── services/
    │   │   └── api.js           # API client and calls
    │   │
    │   ├── styles/
    │   │   └── index.css        # Global styles
    │   │
    │   ├── App.jsx
    │   └── main.jsx
    │
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── package.json
    ├── .env.example
    └── README.md
```

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Configure `.env`:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/healthsync

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your_super_secret_key_here_change_in_production
JWT_EXPIRE=7d

# OpenAI (optional, for real chatbot)
OPENAI_API_KEY=your_openai_key_here

# Frontend
FRONTEND_URL=http://localhost:5173
```

5. (Optional) Seed sample data:
```bash
npm run seed
```

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Configure `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

## ▶️ Running the Application

### Start Backend

```bash
cd backend
npm run dev
```

Backend will run on `http://localhost:5000`

### Start Frontend

In a new terminal:

```bash
cd frontend
npm run dev
```

Frontend will run on `http://localhost:5173`

### Demo Credentials

After seeding:
- Email: `sarah@example.com`
- Password: `password123`

## 📚 API Documentation

### Authentication Endpoints

```
POST /api/auth/signup           - Create new account
POST /api/auth/login            - Login with email/password
GET  /api/auth/verify           - Verify JWT token (protected)
```

### User Profile Endpoints

```
GET  /api/user/profile          - Get user profile (protected)
PUT  /api/user/profile          - Update profile (protected)
PUT  /api/user/nutrition-goals  - Update nutrition goals (protected)
```

### Fitness Endpoints

```
POST /api/fitness/log           - Add workout (protected)
GET  /api/fitness/logs          - Get all workouts (protected)
GET  /api/fitness/stats         - Get fitness stats (protected)
PUT  /api/fitness/log/:logId    - Update workout (protected)
DELETE /api/fitness/log/:logId  - Delete workout (protected)
```

### Nutrition Endpoints

```
POST /api/nutrition/meal        - Add meal (protected)
GET  /api/nutrition/meals       - Get meals (protected)
GET  /api/nutrition/daily-summary - Get daily summary (protected)
PUT  /api/nutrition/meal/:logId - Update meal (protected)
DELETE /api/nutrition/meal/:logId - Delete meal (protected)
```

### Period Endpoints

```
POST /api/period/log            - Add period log (protected)
GET  /api/period/logs           - Get period logs (protected)
GET  /api/period/predictions    - Get predictions (protected)
PUT  /api/period/log/:logId     - Update period log (protected)
DELETE /api/period/log/:logId   - Delete period log (protected)
```

### Chatbot Endpoints

```
POST /api/chatbot/message       - Send message (protected)
GET  /api/chatbot/history       - Get chat history (protected)
DELETE /api/chatbot/history     - Clear history (protected)
```

### Skin Analysis Endpoints

```
POST /api/skin/analyze          - Analyze image (protected)
GET  /api/skin/history          - Get analyses (protected)
GET  /api/skin/latest           - Get latest analysis (protected)
DELETE /api/skin/:analysisId    - Delete analysis (protected)
```

### Dashboard Endpoints

```
GET  /api/dashboard/data        - Get overview (protected)
GET  /api/dashboard/weekly-progress - Get weekly data (protected)
GET  /api/dashboard/monthly-insights - Get monthly data (protected)
```

## 💾 Database Setup

### MongoDB Local Setup

1. Install MongoDB Community Edition
2. Start MongoDB service
3. Create database (automatic on first insert)

### MongoDB Atlas (Cloud)

1. Go to mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update `MONGODB_URI` in `.env`

## 🌐 Deployment

### Backend Deployment (Heroku, AWS, etc.)

1. Set environment variables in hosting platform
2. Ensure MongoDB is accessible
3. Deploy using platform-specific instructions

### Frontend Deployment (Vercel, Netlify, etc.)

1. Build the project:
```bash
npm run build
```

2. Deploy `dist` folder
3. Set `VITE_API_URL` to production backend URL

## 📝 Important Notes

- All API endpoints (except auth) require JWT token
- Token is stored in localStorage automatically
- Passwords are hashed with bcryptjs
- Database uses indexes for optimal performance
- Skin analysis currently uses mock results (can integrate real API)
- Chatbot uses mock responses (can integrate OpenAI API)

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Check MongoDB is running
- Verify connection string in .env
- Check firewall/network settings

### API Connection Errors
- Ensure backend is running on port 5000
- Check CORS settings in server.js
- Verify VITE_API_URL is correct

### Module Errors
- Run `npm install` in both directories
- Clear node_modules and reinstall if needed
- Check Node.js version (14+)

## 💡 Future Enhancements

- Integration with real OpenAI API for chatbot
- Real skin analysis API integration
- Push notifications for reminders
- Data export/report generation
- Mobile app using React Native
- Social features (share progress, join challenges)
- Integration with fitness trackers (Fitbit, Apple Watch, etc.)
- Advanced analytics and ML predictions

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Contributing

Feel free to fork, create issues, and submit PRs for improvements!

---

**Happy health tracking! 💪🥗📊**
