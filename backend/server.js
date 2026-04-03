const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const fitnessRoutes = require('./routes/fitness');
const nutritionRoutes = require('./routes/nutrition');
const periodRoutes = require('./routes/period');
const chatbotRoutes = require('./routes/chatbot');
const skinAnalysisRoutes = require('./routes/skinAnalysis');
const dashboardRoutes = require('./routes/dashboard');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/healthsync')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/fitness', fitnessRoutes);
app.use('/api/nutrition', nutritionRoutes);
app.use('/api/period', periodRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/skin', skinAnalysisRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'HealthSync Backend API',
    status: '✅ Running',
    version: '1.0.0',
    endpoints: '/api/*',
    health: '/api/health'
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'HealthSync Backend is running! 🏃‍♀️' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
