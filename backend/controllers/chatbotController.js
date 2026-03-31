const ChatMessage = require('../models/ChatMessage');
const axios = require('axios');

// Mock health advice responses (since OpenAI API requires authentication)
const mockHealthResponses = {
  fitness: [
    "Great question! For fitness, consistency is key. Aim for 150 minutes of moderate cardio or 75 minutes of intense cardio per week. Don't forget to include strength training 2-3 times a week!",
    "To build muscle effectively, focus on progressive overload - gradually increasing weight or reps. Combine compound exercises with proper nutrition and adequate rest.",
    "Recovery is as important as training! Make sure you get 7-9 hours of sleep, stay hydrated, and incorporate active recovery days like yoga or light walking."
  ],
  nutrition: [
    "A balanced diet should include: 50% vegetables/fruits, 25% lean proteins, and 25% whole grains. Remember to stay hydrated by drinking at least 8 glasses of water daily.",
    "For weight loss, create a moderate calorie deficit (300-500 calories below maintenance) while maintaining adequate protein intake to preserve muscle mass.",
    "Macros matter! Generally, aim for 0.8-1g protein per pound of body weight, with carbs and fats making up the remaining calories based on your preferences."
  ],
  general: [
    "Taking care of your health is a journey, not a destination. Celebrate small wins and be patient with yourself!",
    "Remember: nutrition + exercise + sleep = success. No single factor can compensate for neglecting the others.",
    "If you're feeling overwhelmed, start small. Small consistent changes lead to big results over time."
  ]
};

// Get random mock response
const getMockResponse = (userMessage) => {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('exercise') || lowerMessage.includes('workout') || lowerMessage.includes('training')) {
    return mockHealthResponses.fitness[Math.floor(Math.random() * mockHealthResponses.fitness.length)];
  } else if (lowerMessage.includes('calorie') || lowerMessage.includes('diet') || lowerMessage.includes('eat') || lowerMessage.includes('nutrition')) {
    return mockHealthResponses.nutrition[Math.floor(Math.random() * mockHealthResponses.nutrition.length)];
  }
  return mockHealthResponses.general[Math.floor(Math.random() * mockHealthResponses.general.length)];
};

// Send chat message
exports.sendMessage = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || content.trim() === '') {
      return res.status(400).json({ error: 'Message content is required' });
    }

    // Save user message
    const userMessage = new ChatMessage({
      userId: req.userId,
      role: 'user',
      content
    });

    await userMessage.save();

    // Generate response (using mock for now)
    let assistantResponse;

    // Check if OpenAI API key is available
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here') {
      try {
        // Call OpenAI API (implementation would go here)
        // For now, using mock responses
        assistantResponse = getMockResponse(content);
      } catch (error) {
        console.log('OpenAI API not available, using mock response');
        assistantResponse = getMockResponse(content);
      }
    } else {
      // Use mock response
      assistantResponse = getMockResponse(content);
    }

    // Save assistant message
    const chatMessage = new ChatMessage({
      userId: req.userId,
      role: 'assistant',
      content: assistantResponse
    });

    await chatMessage.save();

    res.status(200).json({
      message: 'Chat message processed',
      data: {
        userMessage: content,
        assistantResponse: assistantResponse
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get chat history
exports.getChatHistory = async (req, res) => {
  try {
    const messages = await ChatMessage.find({ userId: req.userId })
      .sort({ timestamp: 1 })
      .limit(50); // Get last 50 messages

    res.status(200).json({
      message: 'Chat history retrieved',
      count: messages.length,
      data: messages
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Clear chat history
exports.clearChatHistory = async (req, res) => {
  try {
    await ChatMessage.deleteMany({ userId: req.userId });

    res.status(200).json({
      message: 'Chat history cleared successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
