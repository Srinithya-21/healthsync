// Script to seed sample data into MongoDB
// Run with: npm run seed

const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/User');
const FitnessLog = require('../models/FitnessLog');
const NutritionLog = require('../models/NutritionLog');
const PeriodTracker = require('../models/PeriodTracker');
const ChatMessage = require('../models/ChatMessage');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/healthsync');
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await FitnessLog.deleteMany({});
    await NutritionLog.deleteMany({});
    await PeriodTracker.deleteMany({});
    await ChatMessage.deleteMany({});

    // Create sample user
    const user = new User({
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      password: 'password123',
      age: 28,
      weight: 65,
      height: 170,
      gender: 'female',
      fitnessGoal: 'weight_loss',
      dailyCalorieGoal: 2000,
      dailyProteinGoal: 100,
      dailyCarbGoal: 200,
      dailyFatGoal: 65,
      cycleLength: 28,
      lastPeriodDate: new Date(new Date().setDate(new Date().getDate() - 5)),
      theme: 'light'
    });

    await user.save();
    console.log('✅ Sample user created');

    // Create sample fitness logs
    const fitnessLogs = [];
    for (let i = 0; i < 10; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      fitnessLogs.push({
        userId: user._id,
        date,
        type: ['running', 'cycling', 'weightlifting', 'yoga', 'swimming'][Math.floor(Math.random() * 5)],
        duration: Math.floor(Math.random() * 60) + 20,
        caloriesBurned: Math.floor(Math.random() * 400) + 200,
        distance: Math.floor(Math.random() * 10) + 2,
        intensity: ['low', 'moderate', 'high'][Math.floor(Math.random() * 3)],
        notes: 'Great workout today!'
      });
    }

    await FitnessLog.insertMany(fitnessLogs);
    console.log('✅ Sample fitness logs created');

    // Create sample nutrition logs
    const meals = [
      { name: 'Breakfast: Oatmeal with berries', calories: 350, protein: 12, carbs: 50, fats: 8 },
      { name: 'Lunch: Grilled chicken with rice', calories: 600, protein: 45, carbs: 60, fats: 15 },
      { name: 'Dinner: Salmon with vegetables', calories: 550, protein: 40, carbs: 40, fats: 20 },
      { name: 'Snack: Greek yogurt', calories: 150, protein: 20, carbs: 10, fats: 3 }
    ];

    const nutritionLogs = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(i / 4));

      const meal = meals[Math.floor(Math.random() * meals.length)];
      nutritionLogs.push({
        userId: user._id,
        date,
        mealType: ['breakfast', 'lunch', 'dinner', 'snack'][Math.floor(i % 4)],
        mealName: meal.name,
        quantity: '1 serving',
        calories: meal.calories,
        protein: meal.protein,
        carbs: meal.carbs,
        fats: meal.fats,
        notes: 'Logged via HealthSync'
      });
    }

    await NutritionLog.insertMany(nutritionLogs);
    console.log('✅ Sample nutrition logs created');

    // Create sample period logs
    const periodLogs = [];
    for (let i = 0; i < 3; i++) {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - (i * 28));
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 5);

      periodLogs.push({
        userId: user._id,
        startDate,
        endDate,
        symptoms: [
          { symptom: 'cramps', severity: 'mild' },
          { symptom: 'bloating', severity: 'moderate' }
        ],
        notes: 'Normal cycle',
        mood: 'neutral',
        flowType: 'normal'
      });
    }

    await PeriodTracker.insertMany(periodLogs);
    console.log('✅ Sample period logs created');

    // Create sample chat messages
    const chatMessages = [];
    const exchanges = [
      { user: 'How can I improve my running endurance?', assistant: 'To improve your running endurance, gradually increase your weekly mileage by 10%. Include a long run once per week and practice running at a comfortable pace.' },
      { user: 'What are good proteins for muscle gain?', assistant: 'Great sources include: chicken breast, eggs, fish, Greek yogurt, lean beef, and legumes. Aim for 0.8-1g protein per pound of body weight daily.' },
      { user: 'How to manage period symptoms?', assistant: 'Try: stay hydrated, light exercise, heating pad for cramps, magnesium supplements, and adequate sleep. Consult a doctor if symptoms are severe.' }
    ];

    exchanges.forEach((exchange, index) => {
      const timestamp = new Date();
      timestamp.setHours(timestamp.getHours() - (exchanges.length - index));

      chatMessages.push({
        userId: user._id,
        role: 'user',
        content: exchange.user,
        timestamp
      });

      chatMessages.push({
        userId: user._id,
        role: 'assistant',
        content: exchange.assistant,
        timestamp: new Date(timestamp.getTime() + 1000)
      });
    });

    await ChatMessage.insertMany(chatMessages);
    console.log('✅ Sample chat messages created');

    console.log('✨ All sample data seeded successfully!');
    console.log(`\nTest user credentials:\nEmail: sarah@example.com\nPassword: password123`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

connectDB().then(seedData);
