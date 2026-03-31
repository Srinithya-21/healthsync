const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema: Stores user profile and health information
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  age: {
    type: Number,
    default: null
  },
  weight: {
    type: Number, // in kg
    default: null
  },
  height: {
    type: Number, // in cm
    default: null
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    default: null
  },
  fitnessGoal: {
    type: String,
    enum: ['weight_loss', 'muscle_gain', 'endurance', 'general_fitness'],
    default: 'general_fitness'
  },
  dailyCalorieGoal: {
    type: Number,
    default: 2000
  },
  dailyProteinGoal: {
    type: Number, // in grams
    default: 50
  },
  dailyCarbGoal: {
    type: Number, // in grams
    default: 225
  },
  dailyFatGoal: {
    type: Number, // in grams
    default: 78
  },
  // For women - period/cycle information
  cycleLength: {
    type: Number, // in days
    default: 28
  },
  lastPeriodDate: {
    type: Date,
    default: null
  },
  theme: {
    type: String,
    enum: ['light', 'dark'],
    default: 'light'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
