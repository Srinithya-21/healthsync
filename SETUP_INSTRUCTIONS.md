# HealthSync - Complete Setup & Run Instructions

## 📋 Prerequisites

Before starting, ensure you have:
- **Node.js** (v14+) - Download from nodejs.org
- **npm** (comes with Node.js)
- **MongoDB** (local or MongoDB Atlas account)
- **Git** (optional, for version control)
- **A code editor** (VS Code recommended)

Verify installation:
```bash
node --version
npm --version
```

---

## 🗄️ Database Setup (Choose One)

### Option A: Local MongoDB (Easiest)

1. **Download & Install MongoDB**
   - Go to mongodb.com/try/download/community
   - Follow installation guide for your OS
   - Start MongoDB service

2. **Verify MongoDB is Running**
   ```bash
   mongosh  # or mongo
   ```

3. **Use this connection string in .env:**
   ```
   MONGODB_URI=mongodb://localhost:27017/healthsync
   ```

### Option B: MongoDB Atlas (Cloud)

1. **Go to mongodb.com/cloud/atlas**

2. **Create Free Account**
   - Sign up with email
   - Create organization and project

3. **Create a Cluster**
   - Click "Create" → Choose "M0 Free" tier
   - Select region near you
   - Click "Create Cluster"

4. **Get Connection String**
   - Go to "Connect" → "Drivers"
   - Copy connection string
   - Replace `<password>` and `<username>`

5. **Use this in .env:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/healthsync
   ```

---

## 🚀 Step-by-Step Setup

### Step 1: Navigate to Project Directory

```bash
cd healthsync
```

---

### Step 2: Setup Backend

#### 2.1 Install Backend Dependencies

```bash
cd backend
npm install
```

#### 2.2 Create Environment File

```bash
cp .env.example .env
```

Or manually create `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/healthsync
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_key_here_change_in_production
JWT_EXPIRE=7d
OPENAI_API_KEY=your_openai_key_here  # Optional
FRONTEND_URL=http://localhost:5173
```

#### 2.3 (Optional) Seed Sample Data

```bash
npm run seed
```

This adds a sample user:
- Email: `sarah@example.com`
- Password: `password123`

#### 2.4 Start Backend Server

```bash
npm run dev
```

You should see:
```
✅ MongoDB Connected
🚀 Server running on http://localhost:5000
```

**Keep this terminal open!**

---

### Step 3: Setup Frontend (New Terminal)

#### 3.1 Open New Terminal

Don't close the backend terminal. Open a new one and navigate:

```bash
cd healthsync/frontend
```

#### 3.2 Install Frontend Dependencies

```bash
npm install
```

#### 3.3 Create Environment File

```bash
cp .env.example .env
```

Or manually create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

#### 3.4 Start Frontend Development Server

```bash
npm run dev
```

You should see:
```
✅ Local: http://localhost:5173/
```

---

## 🌐 Access the Application

Open your browser and go to:
```
http://localhost:5173
```

You should see the HealthSync login page.

---

## 🔑 Login to the Application

If you ran `npm run seed`, use these credentials:

**Email:** `sarah@example.com`
**Password:** `password123`

Or create a new account by clicking "Sign up"

---

## ✅ What You Should See

### After Login:

1. **Dashboard** - Overview of health metrics
2. **Sidebar** - Navigation menu with all features
3. **Sample Data** - Pre-populated workouts, meals, period logs
4. **Header** - User name, notifications, theme toggle

### Features to Explore:

- 📊 **Dashboard** - See overview of all metrics
- 💪 **Fitness** - Log workouts (there are sample ones)
- 🥗 **Nutrition** - Log meals and track macros
- 📅 **Period** - Track your menstrual cycle
- 🤖 **Chatbot** - Chat with health AI
- 📸 **Skin Scanner** - Upload image for analysis
- 👤 **Profile** - Update personal info and goals

---

## 🛠️ Troubleshooting

### Backend Won't Start

**Error: "MongoDB connection failed"**
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify MongoDB is accessible

**Error: "Port 5000 already in use"**
- Stop other services using port 5000
- Or change PORT in `backend/.env`

**Error: "Module not found"**
- Run: `npm install` in backend directory
- Delete `node_modules` folder and reinstall

---

### Frontend Won't Start

**Error: "VITE_API_URL is not defined"**
- Check `.env` file exists in frontend directory
- Ensure `VITE_API_URL=http://localhost:5000/api`

**Error: "Server running on http://localhost:5000 refused to connect"**
- Make sure backend is running
- Check backend terminal for errors

**Error: "npm: command not found"**
- Reinstall Node.js from nodejs.org

---

### Application Issues

**Can't Login**
- Verify email and password are correct
- Check backend is running (see http://localhost:5000/api/health)
- Check browser console for errors (F12)

**Data Not Showing**
- Refresh page (Ctrl+F5)
- Check browser console for errors
- Verify JWT token in browser storage (F12 → Application)

**Styling Looks Broken**
- Kill both servers (Ctrl+C)
- Delete `node_modules` in frontend
- Run `npm install` and `npm run dev` again

---

## 💾 Development Tips

### Stop the Servers

In both terminals, press:
```
Ctrl + C
```

### Restart the Servers

```bash
# Backend
npm run dev

# Frontend (new terminal)
npm run dev
```

### View Logs

**Backend Logs:** Check terminal where backend is running
**Frontend Logs:** Check terminal where frontend is running
**Browser Logs:** Press F12 → Console

### Hot Reload

Both frontend and backend support hot reload:
- Edit files and save
- Changes appear instantly
- No restart needed

### Clear All Data

If you want to reset everything:

1. Stop both servers (Ctrl+C)
2. Delete data in MongoDB:
   ```bash
   # Using mongosh
   use healthsync
   db.users.deleteMany({})
   db.fitnesslogs.deleteMany({})
   # etc...
   ```
3. Run seed again: `npm run seed`

---

## 🔄 Production Build

When ready to deploy:

### Frontend Build

```bash
cd frontend
npm run build
```

Creates optimized files in `frontend/dist/`

### Deploy to Vercel (Easy)

1. Push to GitHub
2. Go to vercel.com
3. Import your repository
4. Set `VITE_API_URL` in environment variables
5. Deploy!

### Deploy Backend

Options:
- Heroku (add Procfile)
- AWS (EC2 or Elastic Beanstalk)
- DigitalOcean
- MongoDB Atlas for database

---

## 📝 Environment Variables Summary

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/healthsync
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
OPENAI_API_KEY=optional
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🎯 Next Steps

1. ✅ Run setup (above)
2. ✅ Login with demo account
3. ✅ Explore all features
4. ✅ Create your own account
5. ✅ Customize profile settings
6. ✅ Start logging data
7. ✅ Check dashboard for insights

---

## 📚 Need Help?

1. **Quick Setup Issues** → See Troubleshooting above
2. **API Issues** → Check backend/README.md
3. **Frontend Issues** → Check frontend/README.md
4. **Database Issues** → Check MongoDB documentation
5. **Browser Console** → Press F12 for error messages

---

## 🎉 Success!

If you see the login page at http://localhost:5173, **you're all set!**

Start by:
1. Login with sarah@example.com / password123
2. Check Dashboard to see sample data
3. Try adding your first workout
4. Explore the Nutrition tracker
5. Check the Chatbot for tips

**Happy health tracking!** 💪🥗📊

---

## 💡 Quick Reference

| Command | What It Does |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm install` | Install dependencies |
| `npm run seed` | Load sample data (backend only) |

| URL | Purpose |
|-----|---------|
| http://localhost:5173 | Frontend application |
| http://localhost:5000 | Backend API |
| http://localhost:5000/api/health | API health check |

---

**Version:** 1.0.0  
**Last Updated:** 2024  
**Status:** ✅ Production Ready
