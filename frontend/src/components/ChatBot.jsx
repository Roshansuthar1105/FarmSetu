import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';

// AI Service Configuration
const AI_SERVICES = {
  DEEPSEEK: 'deepseek',
  LOCAL: 'local'
};

// Agricultural Knowledge Base for fallback
const agriculturalKnowledge = {
  crops: {
    summer: "For summer season (March-June), grow: Cotton, Maize, Millets (Bajra, Jowar), Groundnut, Pulses (Moong, Urad), Sugarcane, Sunflower. These crops tolerate high temperatures and require less water.",
    winter: "For winter season (October-February), grow: Wheat, Barley, Mustard, Potato, Peas, Carrot, Cabbage, Cauliflower. These crops need cooler temperatures for proper growth.",
    monsoon: "For monsoon season (July-September), grow: Paddy (Rice), Soybean, Pulses (Arhar, Moong), Maize, Cotton, Jute. These crops benefit from abundant rainfall."
  },
  soil: "Improve soil quality by: 1) Adding organic compost (3-5 tons/acre), 2) Using green manure crops, 3) Practicing crop rotation, 4) Maintaining pH 6.0-7.5, 5) Using vermicompost, 6) Mulching to conserve moisture.",
  pests: "For pest control: 1) Use neem-based pesticides, 2) Practice crop rotation, 3) Introduce beneficial insects, 4) Use pheromone traps, 5) Maintain field sanitation, 6) Monitor crops regularly.",
  weather: "Check weather through: IMD (India Meteorological Department), mausam.imd.gov.in, weather apps, or local agricultural extension services. Always verify forecasts before farming activities.",
  prices: "Check market prices via: 1) Local mandi rates, 2) e-NAM portal, 3) Agmarknet, 4) State agricultural departments, 5) Commodity trading apps. Prices vary daily by region and quality.",
  fertilizer: "Use balanced fertilizers: N-P-K ratio depends on soil test. Organic options: compost, vermicompost, green manure. Chemical fertilizers should be used based on soil test recommendations.",
  irrigation: "Efficient irrigation methods: 1) Drip irrigation for water conservation, 2) Sprinkler systems for large areas, 3) Rainwater harvesting, 4) Schedule irrigation based on soil moisture."
};

class AIService {
  constructor(serviceType) {
    this.serviceType = serviceType;
  }

  // DeepSeek AI Service
  async callDeepSeekAPI(prompt) {
    try {
      const apiKey = import.meta.env.VITE_DEEPSEEK_KEY;
      
      if (!apiKey) {
        throw new Error('DeepSeek API key not found');
      }

      const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: `You are an agricultural expert assistant for FarmSetu. You provide practical, actionable farming advice to Indian farmers. 
              Be concise, helpful, and focus on sustainable farming practices. 
              Provide specific recommendations for crops, soil, pests, weather, and market information.
              Keep responses under 300 words and use simple language.`
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 500,
          temperature: 0.7,
          stream: false
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`DeepSeek API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      
      if (data.choices && data.choices[0] && data.choices[0].message) {
        return data.choices[0].message.content;
      } else {
        throw new Error('Invalid response format from DeepSeek API');
      }
    } catch (error) {
      console.error('DeepSeek API error:', error);
      throw error;
    }
  }

  // Local AI Service (fallback with comprehensive agricultural knowledge)
  async callLocalAI(prompt) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const lowerPrompt = prompt.toLowerCase();
        
        // Enhanced keyword matching with more agricultural terms
        if (lowerPrompt.includes('crop') && lowerPrompt.includes('summer')) {
          resolve(agriculturalKnowledge.crops.summer);
        } else if (lowerPrompt.includes('crop') && lowerPrompt.includes('winter')) {
          resolve(agriculturalKnowledge.crops.winter);
        } else if (lowerPrompt.includes('crop') && (lowerPrompt.includes('monsoon') || lowerPrompt.includes('rain'))) {
          resolve(agriculturalKnowledge.crops.monsoon);
        } else if (lowerPrompt.includes('soil') || lowerPrompt.includes('quality') || lowerPrompt.includes('fertile')) {
          resolve(agriculturalKnowledge.soil);
        } else if (lowerPrompt.includes('pest') || lowerPrompt.includes('insect') || lowerPrompt.includes('disease')) {
          resolve(agriculturalKnowledge.pests);
        } else if (lowerPrompt.includes('weather') || lowerPrompt.includes('rain') || lowerPrompt.includes('temperature')) {
          resolve(agriculturalKnowledge.weather);
        } else if (lowerPrompt.includes('price') || lowerPrompt.includes('market') || lowerPrompt.includes('sell')) {
          resolve(agriculturalKnowledge.prices);
        } else if (lowerPrompt.includes('fertilizer') || lowerPrompt.includes('manure') || lowerPrompt.includes('nutrient')) {
          resolve(agriculturalKnowledge.fertilizer);
        } else if (lowerPrompt.includes('water') || lowerPrompt.includes('irrigation') || lowerPrompt.includes('drip')) {
          resolve(agriculturalKnowledge.irrigation);
        } else if (lowerPrompt.includes('hello') || lowerPrompt.includes('hi') || lowerPrompt.includes('namaste')) {
          resolve("Namaste! I'm your FarmSetu agricultural assistant. I can help you with crop selection, soil management, pest control, weather information, market prices, and farming techniques. What would you like to know?");
        } else {
          resolve(`I'm here to help with your farming questions! I can assist with:

🌱 **Crop Selection**: Best crops for summer, winter, monsoon seasons
🌾 **Soil Management**: Improving soil quality and fertility
🐛 **Pest Control**: Natural and chemical pest management
🌧️ **Weather Information**: Seasonal advice and forecasts
💰 **Market Prices**: Where to check current rates
💧 **Irrigation**: Water management techniques
🌿 **Fertilizers**: Organic and chemical options

Please ask me specific questions about farming, and I'll provide practical advice based on agricultural best practices.`);
        }
      }, 1000); // Simulate API delay
    });
  }

  // Main method to call the appropriate AI service
  async generateResponse(prompt) {
    try {
      switch (this.serviceType) {
        case AI_SERVICES.DEEPSEEK:
          return await this.callDeepSeekAPI(prompt);
        case AI_SERVICES.LOCAL:
        default:
          return await this.callLocalAI(prompt);
      }
    } catch (error) {
      console.error(`AI service ${this.serviceType} failed:`, error);
      // Fallback to local AI with error context
      const fallbackResponse = await this.callLocalAI(prompt);
      return `${fallbackResponse}\n\n💡 *Note: Using local knowledge base*`;
    }
  }
}

const predefinedQuestions = [
  'What are the best crops to grow in summer season?',
  'How can I improve soil quality?',
  'What are the current market prices for wheat?',
  'Can you provide tips for pest control?',
  'What are the upcoming weather conditions?',
  'Which fertilizers should I use for wheat?',
];

const ChatBot = ({ visible, onClose }) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [conversationStarted, setConversationStarted] = useState(false);
  const messagesEndRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [currentAIService, setCurrentAIService] = useState(AI_SERVICES.LOCAL);
  const [availableServices, setAvailableServices] = useState([AI_SERVICES.LOCAL]);

  // Detect available AI services based on API keys
  useEffect(() => {
    const detectedServices = [AI_SERVICES.LOCAL];
    
    if (import.meta.env.VITE_DEEPSEEK_KEY) {
      detectedServices.push(AI_SERVICES.DEEPSEEK);
    }
    
    setAvailableServices(detectedServices);
    
    // Prefer DeepSeek if available
    if (detectedServices.includes(AI_SERVICES.DEEPSEEK)) {
      setCurrentAIService(AI_SERVICES.DEEPSEEK);
    }
  }, []);

  // Save messages to localStorage
  const saveMessagesToLocalStorage = (messages) => {
    try {
      localStorage.setItem('chatHistory', JSON.stringify(messages));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  // Load messages from localStorage on component mount
  useEffect(() => {
    try {
      const savedMessages = localStorage.getItem('chatHistory');
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
        setConversationStarted(JSON.parse(savedMessages).length > 0);
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Send message function
  const sendMessage = async (message) => {
    if (!message.trim()) return;

    const userMessage = { text: message, user: 'user' };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setInput('');
    setConversationStarted(true);
    setLoading(true);

    try {
      const aiService = new AIService(currentAIService);
      const botResponse = await aiService.generateResponse(message);
      const botMessage = { text: botResponse, user: 'bot' };
      
      const updatedMessages = [...newMessages, botMessage];
      setMessages(updatedMessages);
      saveMessagesToLocalStorage(updatedMessages);
    } catch (error) {
      console.error('Error in sendMessage:', error);
      const errorMessage = { 
        text: "I'm currently experiencing technical difficulties. Please try again later or check your internet connection. Meanwhile, I can help you with basic agricultural knowledge.", 
        user: 'bot' 
      };
      const updatedMessages = [...newMessages, errorMessage];
      setMessages(updatedMessages);
      saveMessagesToLocalStorage(updatedMessages);
    } finally {
      setLoading(false);
    }
  };

  // Clear chat history
  const clearChat = () => {
    setMessages([]);
    setConversationStarted(false);
    localStorage.removeItem('chatHistory');
  };

  // Switch AI service
  const switchAIService = (service) => {
    setCurrentAIService(service);
    // Add a notification message
    const serviceName = service === AI_SERVICES.DEEPSEEK ? 'DeepSeek AI' : 'Local Knowledge Base';
    const notification = {
      text: `Switched to ${serviceName}. How can I help you with farming today?`,
      user: 'bot'
    };
    setMessages(prev => [...prev, notification]);
  };

  if (!visible) return null;

  return (
    <div className="z-40 fixed bottom-20 right-4 w-96 h-[80vh] bg-white shadow-2xl rounded-lg overflow-hidden flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-green-600 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src="https://cdn-icons-png.flaticon.com/128/6231/6231457.png" 
            alt="chatbot" 
            className="w-6 h-6 mr-2" 
          />
          <div>
            <h3 className="text-xl font-semibold">{t('chatbot') || 'FarmSetu Assistant'}</h3>
            <div className="text-xs text-green-200 flex items-center">
              <span className={`w-2 h-2 rounded-full mr-1 ${
                currentAIService === AI_SERVICES.DEEPSEEK ? 'bg-blue-400' : 'bg-yellow-400'
              }`}></span>
              {currentAIService === AI_SERVICES.DEEPSEEK ? 'DeepSeek AI' : 'Local Knowledge'}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {conversationStarted && (
            <button 
              onClick={clearChat}
              className="text-sm bg-green-700 hover:bg-green-800 px-2 py-1 rounded transition duration-300"
              title="Clear chat"
            >
              Clear
            </button>
          )}
          <button 
            onClick={onClose} 
            className="hover:bg-green-700 rounded-full p-1 transition duration-300"
          >
            <AiOutlineClose size={20} />
          </button>
        </div>
      </div>

      {/* AI Service Selector */}
      {availableServices.length > 1 && (
        <div className="bg-green-500 px-4 py-2 flex justify-center space-x-4">
          {availableServices.map(service => (
            <button
              key={service}
              onClick={() => switchAIService(service)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                currentAIService === service
                  ? 'bg-white text-green-600'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {service === AI_SERVICES.DEEPSEEK ? 'DeepSeek AI' : 'Local'}
            </button>
          ))}
        </div>
      )}

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto bg-green-50 p-4">
        {messages.length === 0 ? (
          <div className="text-center text-green-600 py-8">
            <div className="text-lg font-semibold mb-2">
              {t('start_a_conversation') || 'Start a conversation with our farming expert!'}
            </div>
            <div className="text-sm text-green-500 mb-4">
              Ask about crops, weather, market prices, or farming techniques.
            </div>
            {currentAIService === AI_SERVICES.LOCAL && (
              <div className="text-xs text-yellow-600 bg-yellow-50 p-2 rounded-lg">
                Using comprehensive local agricultural knowledge base
              </div>
            )}
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 flex ${
                msg.user === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                  msg.user === 'user' 
                    ? 'bg-green-500 text-white rounded-br-none' 
                    : 'bg-white text-green-800 border border-green-200 rounded-bl-none shadow-sm'
                }`}
              >
                <div className="text-sm whitespace-pre-wrap">
                  {msg.user === 'bot' && (
                    <div className="font-semibold text-green-600 text-xs mb-1">
                      FarmSetu Assistant
                    </div>
                  )}
                  {msg.text}
                </div>
              </div>
            </div>
          ))
        )}
        
        {loading && (
          <div className="flex justify-start mb-4">
            <div className="bg-white border border-green-200 text-green-800 px-4 py-2 rounded-2xl rounded-bl-none shadow-sm">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-sm">
                  {currentAIService === AI_SERVICES.DEEPSEEK ? 'Consulting DeepSeek AI...' : 'Thinking...'}
                </span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-green-200 bg-white p-4">
        {!conversationStarted && (
          <div className="mb-3">
            <p className="text-green-600 font-semibold mb-2 text-sm">
              {t('quick_questions') || 'Quick Questions:'}
            </p>
            <div className="grid grid-cols-1 gap-2">
              {predefinedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => sendMessage(question)}
                  disabled={loading}
                  className="bg-green-100 text-green-800 px-3 py-2 rounded-lg hover:bg-green-200 transition-colors duration-300 text-left text-sm disabled:opacity-50"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            className="flex-1 px-4 py-2 border border-green-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 disabled:opacity-50"
            placeholder={t('type_a_message') || 'Type your farming question...'}
            onKeyPress={(e) => e.key === 'Enter' && !loading && sendMessage(input)}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={loading || !input.trim()}
            className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>

        <div className="text-xs text-gray-500 text-center mt-2">
          Powered by {currentAIService === AI_SERVICES.DEEPSEEK ? 'DeepSeek AI' : 'Local Agricultural Knowledge'}
        </div>
      </div>
    </div>
  );
};

export default ChatBot;