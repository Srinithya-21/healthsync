# HealthSync - Quick Start Guide

## 🚀 Quick Setup (5 minutes)

### Step 1: Backend Setup

```bash
cd healthsync/backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Seed sample data (optional)
npm run seed

# Start development server
npm run dev
```

Backend running at: **http://localhost:5000**

### Step 2: Frontend Setup (New Terminal)

```bash
cd healthsync/frontend

# Install dependencies
npm install

# Create .env file  
cp .env.example .env

# Start development server
npm run dev
```

Frontend running at: **http://localhost:5173**

## 📝 Login with Demo Account

After seeding the backend:

- **Email:** sarah@example.com
- **Password:** password123

## 📋 What You Get

### Dashboard
- Overview of all health metrics
- Weekly fitness progress
- Calorie balance visualization
- Quick action buttons

### Fitness Tracker 💪
- Log workouts (running, cycling, weightlifting, yoga, etc.)
- Track duration, calories burned, distance
- View workout history and statistics
- Delete/edit workouts

### Nutrition Tracker 🥗
- Log meals (breakfast, lunch, dinner, snacks)
- Track calories and macros (protein, carbs, fats)
- Set daily goals
- Daily nutrition summary with progress
- Daily macro breakdown

### Period Tracker 📅
- Log period start and end dates
- Track symptoms and mood
- Automatic next period prediction
- Ovulation date calculation
- Fertility window prediction
- Period history

### AI Chatbot 🤖
- Chat interface for health advice
- Mock responses about fitness, nutrition, health
- Message history
- Clear history option

### Skin Analysis 📸
- Upload images for skin analysis
- Get recommendations (acne, dryness, sensitivity, etc.)
- View analysis history
- Mock AI analysis (ready for real API)

### Profile Management 👤
- Update personal information (age, weight, height)
- Set fitness goals
- Configure nutrition goals
- Period tracking settings

## 🗄️ Database

Default MongoDB setup:
```
mongodb://localhost:27017/healthsync
```

To use MongoDB Atlas:
1. Create an account at mongodb.com/cloud/atlas
2. Get connection string
3. Update `MONGODB_URI` in `backend/.env`

## 📁 Project Structure

```
healthsync/
├── backend/          # Express.js + MongoDB
│   ├── models/       # Database schemas
│   ├── routes/       # API endpoints
│   ├── controllers/  # Business logic
│   └── scripts/      # Seed data
│
└── frontend/         # React + Vite
    └── src/
        ├── components/  # Reusable components
        ├── pages/       # Page components
        ├── context/     # Auth state
        └── services/    # API client
```

## 🛠️ Technology Stack

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs (password hashing)

**Frontend:**
- React 18
- Vite (build tool)
- Tailwind CSS (styling)
- React Router (navigation)
- Axios (HTTP client)

## 🔑 Key Features

✅ User Authentication (signup/login)
✅ JWT Token Management
✅ Workout Tracking
✅ Meal & Nutrition Logging
✅ Period/Cycle Tracking
✅ AI Chatbot
✅ Skin Analysis
✅ Dashboard Analytics
✅ Responsive Design
✅ Dark Mode Ready

## 🚨 Troubleshooting

**Port Already in Use:**
```bash
# Change port in backend/server.js or frontend/vite.config.js
```

**MongoDB Not Connected:**
- Ensure MongoDB is running: `mongod`
- Check connection string in `backend/.env`

**CORS Errors:**
- Backend should be on port 5000
- Frontend on port 5173
- Check `FRONTEND_URL` in backend/.env

**Modules Not Found:**
```bash
npm install  # Run in both backend and frontend directories
```

## 📚 API Examples

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"sarah@example.com","password":"password123"}'
```

### Add Workout
```bash
curl -X POST http://localhost:5000/api/fitness/log \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "date":"2024-03-31",
    "type":"running",
    "duration":30,
    "caloriesBurned":300,
    "intensity":"moderate"
  }'
```

## 🎯 Next Steps

1. Customize nutrition goals in Profile
2. Start logging workouts and meals
3. Add your last period date for cycle tracking
4. Chat with the AI assistant for tips
5. Upload images for skin analysis
6. Check dashboard for insights

## 📖 Full Documentation

- Backend docs: `backend/README.md`
- Frontend docs: `frontend/README.md`
- API docs: See README.md (API Documentation section)

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the README files in each directory
3. Check browser console for errors
4. Check terminal for backend errors

## 💡 Tips

- Demo data includes sample workouts and meals
- Use the seed script to populate test data
- All dates are stored in UTC
- Token expires after 7 days
- Profile updates are immediate
- Period predictions assume 28-day cycle (adjustable)

---

**Enjoy tracking your health! 💪**
