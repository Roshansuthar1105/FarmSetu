import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useTranslation } from 'react-i18next';

const genAI = new GoogleGenerativeAI('AIzaSyC6tmEypaRp_iI3qR605anTGNOzoxD7erQ');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const predefinedQuestions = [
  'What are the best crops to grow in summer season?',
  'How can I improve soil quality?',
  'What are the current market prices for wheat?',
  'Can you provide tips for pest control?',
  'What are the upcoming weather conditions in Jaipur?',
];

const ChatBot = ({ visible, onClose }) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [conversationStarted, setConversationStarted] = useState(false);
  const messagesEndRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const saveMessagesToLocalStorage = (messages) => {
    localStorage.setItem('chatHistory', JSON.stringify(messages));
  };
  const sendMessage = async (message) => {
    if (message.trim() !== '') {
      const newMessages = [...messages, { text: message, user: 'user' }];
      setMessages(newMessages);
      saveMessagesToLocalStorage(newMessages); // Save messages to local storage
      setInput('');
      setConversationStarted(true);
      setLoading(true);
      // Get the bot response from the Gemini API
      try{
      const botResponse = await getBotResponse(message);

      setMessages((prevMessages) => [
        ...prevMessages,
          { text: botResponse, user: 'bot' },
        ]);
      } catch (error) {
        console.error('Error fetching bot response:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const getBotResponse = async (prompt) => {
    try {
      // Concatenate previous messages into a single prompt
      const conversationHistory = messages.map(msg => `${msg.user}: ${msg.text}`).join('\n');
      const fullPrompt = `${conversationHistory}\nUser: ${prompt}`; // Add the new user prompt
  
      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error fetching bot response:', error);
      return t('error_fetching_response');
    }
  };
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  useEffect(() => {
    // Load chat history from local storage
    const savedMessages = JSON.parse(localStorage.getItem('chatHistory')) || [];
    setMessages(savedMessages);
    
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);
  if (!visible) return null;

  return (
    <div className="fixed bottom-20 right-4 w-96 h-[80vh] overflow-y-auto bg-white shadow-2xl rounded-lg overflow-hidden scrollbar-hide animate-fadeIn z-50">
      <div className="sticky top-0 z-50 bg-blue-600 text-white px-4 py-3 animate-slideDown flex flex-row items-center justify-between">
        <h3 className="text-xl font-semibold">{t('chatbot')} <img src="https://cdn-icons-png.flaticon.com/128/6231/6231457.png" alt="chatbot" className="w-6 h-6 inline-block ml-2" /></h3>
        <button onClick={onClose} className="hover:bg-blue-700 rounded-full p-1 transition duration-300">
          <AiOutlineClose size={24} />
        </button>
      </div>
      <div className="p-4 max-h-[64vh] min-h-[200px] overflow-y-auto bg-blue-50">
        {messages.length === 0 ? (
          <div className="text-center text-blue-500 animate-pulse">
            {t('start_a_conversation')}
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-3 flex ${
                msg.user === 'user' ? 'justify-end' : 'justify-start'
              } animate-fadeIn`}
            >
              <div
                className={`px-4 py-2 rounded-xl max-w-xs ${
                  msg.user === 'user' ? 'bg-blue-500 text-white' : 'bg-blue-200 text-blue-800'
                }`}
              >
                {msg.user === 'user' ? msg.text : msg.text.split('*').map((text, i) => 
                  i % 2 === 0 ? text : <strong key={i}>{text}</strong>
                )}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex flex-col p-3 border-t bg-blue-100">
        {!conversationStarted && (
          <div className="mb-3">
            <p className="text-blue-600 font-semibold mb-2">{t('quick_questions')}:</p>
            <div className="grid grid-cols-2 gap-2">
              {predefinedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => sendMessage(question)}
                  className="bg-blue-200 text-blue-800 px-3 py-1 rounded-lg hover:bg-blue-300 transition-colors duration-300"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="flex items-center">
          <input
            type="text"
            value={loading ? t('responding') : input}
            disabled={loading}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            placeholder={t('type_a_message')}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage(input)}
          />
          <button
            onClick={() => sendMessage(input)}
            className="ml-3 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300 "
          >
            {t('send')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
