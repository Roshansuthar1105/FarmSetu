import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const testimonials = [
  {
    name: 'Raj Patel',
    handle: '@rajpatel',
    text: "🌱 FarmSetu has revolutionized the way I manage my farm. The real-time market information is invaluable. I can quickly access price trends, making informed decisions about when to sell my crops. The negotiation tools have also helped me secure better deals. Highly recommended!",
    link: 'www.FarmSetu.com',
  },
  {
    name: 'Ananya Singh',
    handle: '@ananyasingh',
    text: 'FarmSetu is a game-changer for farmers. The price negotiation tools are superb, and the market trend analysis is spot-on. I’ve been able to adjust my strategies based on the latest data, which has improved my farm’s profitability significantly.',
  },
  {
    name: 'Vikram Yadav',
    handle: '@vikramyadav',
    text: 'Fantastic app for farmers! The interface is user-friendly and the data is always up-to-date. I particularly appreciate the detailed market insights and historical price data, which help me make better planting and selling decisions.',
  },
  {
    name: 'Neha Sharma',
    handle: '@neha_sharma',
    text: 'I’ve been using FarmSetu for a few months, and it’s been extremely helpful in tracking market trends. The app’s real-time updates and historical data analysis have made a huge difference in how I plan my farming activities.',
  },
  {
    name: 'Amit Kumar',
    handle: '@amitkumar',
    text: 'FarmSetu is a must-have for every farmer. The price discovery features are top-notch! The app provides a comprehensive view of market conditions and price fluctuations, which has been invaluable for my farm management.',
  },
  {
    name: 'Ravi Gupta',
    handle: '@ravigupta',
    text: 'The best agricultural app I’ve come across. It’s packed with features that really help with farm management. From real-time price updates to trend analysis, FarmSetu covers it all. It has become an essential tool for my farming operations.',
    link: 'www.FarmSetu.com',
  },
  {
    name: 'Sita Devi',
    handle: '@sitadevi',
    text: 'Impressive app with a great user interface. The real-time updates on prices are very useful for making timely decisions. I also appreciate the easy-to-use features for tracking market trends and price changes.',
  },
  {
    name: 'Arjun Verma',
    handle: '@arjun_verma',
    text: 'FarmSetu has made it so much easier to get accurate market information. The app’s analytics tools help me understand market trends better and make data-driven decisions that improve my farm’s profitability.',
  },
  {
    name: 'Maya Rao',
    handle: '@mayarao',
    text: 'A fantastic tool for modern farming. The app’s insights have significantly improved our productivity. The detailed price information and market forecasts allow me to plan my crops more effectively and optimize my yields.',
  },
  {
    name: 'Deepak Singh',
    handle: '@deepaksingh',
    text: 'FarmSetu is a brilliant resource for farmers. It’s user-friendly and provides valuable market data. I especially like the price comparison features that help me find the best prices for my produce.',
  },
  {
    name: 'Kiran Patel',
    handle: '@kiranpatel',
    text: 'Love the app! The features for price tracking and negotiation have been a game-changer for my farm. The app’s detailed market analysis and price prediction tools have helped me make more informed decisions.',
  },
  {
    name: 'Priya Reddy',
    handle: '@priyareddy',
    text: 'FarmSetu has transformed how we approach farming. The app is packed with features that genuinely help. The real-time price updates and market insights have made a significant impact on our farming strategy.',
  },
  {
    name: 'Mohammed Ali',
    handle: '@mohammedali',
    text: 'Great app for anyone in the agriculture sector. The real-time data and tools are incredibly useful. The app’s comprehensive market analysis and price forecasting features are particularly valuable for strategic planning.',
  },
  {
    name: 'Sunita Rao',
    handle: '@sunitarao',
    text: 'The market information and price tools are exactly what we needed. Highly recommend FarmSetu! The app provides detailed insights into market trends and price changes, helping us make better decisions for our farm.',
  },
  {
    name: 'Rajesh Kumar',
    handle: '@rajeshkumar',
    text: 'FarmSetu is a reliable source for market trends and price updates. It has become an essential tool for us. The app’s user-friendly interface and accurate data have made managing our farm much easier.',
  },
  {
    name: 'Anil Sharma',
    handle: '@anilsharma',
    text: 'The app’s features are fantastic. It’s easy to navigate and provides accurate data for farming. The price tracking and market analysis tools have been invaluable for optimizing my farming operations.',
  },
  {
    name: 'Manisha Patel',
    handle: '@manishapatel',
    text: 'FarmSetu has been a valuable asset for my farm. The insights and tools are excellent! The app’s real-time updates and detailed market information have greatly improved our productivity and decision-making.',
  },
  {
    name: 'Rohit Singh',
    handle: '@rohitsingh',
    text: 'The best agricultural app available. It offers valuable features and a user-friendly interface. The comprehensive market data and price tracking tools are crucial for managing my farm efficiently.',
  },
  {
    name: 'Kavita Yadav',
    handle: '@kavitayadav',
    text: 'Excellent app with all the right tools for farm management. Highly recommend to all farmers! The app’s real-time price updates and market trend analysis are incredibly useful for planning and decision-making.',
  },
  {
    name: 'Nitin Gupta',
    handle: '@nitingupta',
    text: 'FarmSetu provides all the information I need to manage my farm effectively. Fantastic app! The app’s detailed market insights and price discovery tools have made a significant difference in our farming operations.',
  },
  {
    name: 'Sanjay Sharma',
    handle: '@sanjaysharma',
    text: 'A top-notch app for agriculture. The features for price tracking and market insights are incredibly useful. The app’s real-time data and comprehensive analysis tools have greatly enhanced our farm management.',
  },
  {
    name: 'Seema Patel',
    handle: '@seemapatel',
    text: 'FarmSetu has made it so much easier to manage farm activities and get market data in real time. The app’s user-friendly interface and accurate price updates are essential for making informed farming decisions.',
  },
  {
    name: 'Ajay Singh',
    handle: '@ajaysingh',
    text: 'An excellent resource for farmers. The app’s market data and price tools are exceptional. The real-time updates and comprehensive analysis have been crucial for optimizing our farming strategies.',
  },
  {
    name: 'Rita Rao',
    handle: '@ritarao',
    text: 'The app’s interface is very user-friendly, and the market information is always accurate. Highly recommend! The app’s detailed insights and price tracking features have been instrumental in improving our farm management.',
  },
  {
    name: 'Vijay Kumar',
    handle: '@vijaykumar',
    text: 'FarmSetu is a fantastic tool for modern farmers. The real-time updates and features are very helpful. The app’s comprehensive market analysis and price forecasting tools have greatly enhanced our farming efficiency.',
  },
  {
    name: 'Pooja Sharma',
    handle: '@poojasharma',
    text: 'I love using FarmSetu. It provides valuable insights and is very easy to use. The app’s real-time data and market analysis tools have been essential for making informed decisions and improving our farm’s productivity.',
  },
  {
    name: 'Gaurav Patel',
    handle: '@gauravpatel',
    text: 'A great app for managing farm activities and getting accurate market information. The app’s detailed insights and price tracking tools have made a significant difference in our farming operations.',
  },
  {
    name: 'Divya Reddy',
    handle: '@divyareddy',
    text: 'FarmSetu has been a great addition to our farming toolkit. The features are very useful. The app’s real-time updates and comprehensive market analysis have greatly improved our decision-making and farm management.',
  },
  {
    name: 'Manoj Yadav',
    handle: '@manojyadav',
    text: 'The best app for farmers. The data and tools provided are top-notch. The app’s real-time price updates and market insights have been invaluable for optimizing our farming strategies and productivity.',
  },
  {
    name: 'Sonia Singh',
    handle: '@soniasingh',
    text: 'FarmSetu is an amazing app with valuable features for farm management. Highly recommended! The app’s detailed market analysis and price tracking tools have significantly improved our farming operations.',
  },
  {
    name: 'Amit Sharma',
    handle: '@amitsharma',
    text: 'This app has changed the way we approach farming. The insights and tools are fantastic! The real-time updates and comprehensive market data have greatly enhanced our farm management and decision-making.',
  },
  {
    name: 'Nisha Patel',
    handle: '@nishapatel',
    text: 'A must-have app for any farmer. It provides valuable market data and is very easy to use. The app’s real-time updates and detailed market insights have been essential for improving our farm’s productivity.',
  },
  {
    name: 'Ashok Gupta',
    handle: '@ashokgupta',
    text: 'FarmSetu is an excellent resource for farmers. The features are very helpful for managing farm activities. The app’s comprehensive market data and real-time price updates have been crucial for making informed decisions.',
  },
  {
    name: 'Preeti Rao',
    handle: '@preetirao',
    text: 'The app’s market insights and tools are incredibly useful. I highly recommend FarmSetu! The real-time updates and detailed analysis have greatly improved our farm management and decision-making processes.',
  },
  {
    name: 'Harish Kumar',
    handle: '@harishkumar',
    text: 'FarmSetu has made farming much easier with its real-time data and user-friendly features. The app’s comprehensive market analysis and price tracking tools have been essential for optimizing our farming strategies.',
  },
  {
    name: 'Neelam Singh',
    handle: '@neelamsingh',
    text: 'An outstanding app for agriculture. The market data and features are top-notch. The app’s real-time updates and detailed insights have greatly enhanced our farm management and productivity.',
  },
  {
    name: 'Deepika Patel',
    handle: '@deepikapatel',
    text: 'I am very impressed with FarmSetu. It’s a great tool for farm management and market information. The app’s real-time price updates and comprehensive market analysis have been invaluable for improving our farming operations.',
  },
  {
    name: 'Rajiv Sharma',
    handle: '@rajivsharma',
    text: 'FarmSetu provides all the tools and information I need to manage my farm effectively. The real-time updates and detailed market insights have significantly improved our farm management and decision-making.',
  },
];

const Testimonials = () => {
  // Number of testimonials per column
  const testimonialsPerColumn = 3;

  // Split testimonials into columns
  const columns = Array.from({ length: Math.ceil(testimonials.length / testimonialsPerColumn) }, (_, index) =>
    testimonials.slice(index * testimonialsPerColumn, index * testimonialsPerColumn + testimonialsPerColumn)
  );

  const { t } = useTranslation();
  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 text-white py-16 px-6 md:py-24 md:px-12 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-blue-300 dark:from-green-200 dark:to-blue-200">
              {t('testimonials_heading')}
            </span>
          </h2>
          <p className="text-gray-300 dark:text-gray-200 max-w-2xl mx-auto text-lg">
            {t('testimonials_subheading')}
          </p>
        </div>

        <div className="relative overflow-hidden h-[500px]"> {/* Adjust height as needed */}
          <motion.div
            className="absolute top-0 left-0 right-0 grid grid-cols-1 md:grid-cols-3 gap-6"
            animate={{ y: ['0%', '-100%'] }}
            transition={{
              duration: 50, // Adjust animation duration for desired speed
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {columns.map((column, columnIndex) => (
              <div key={columnIndex} className="space-y-6">
                {column.map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl shadow-xl border border-gray-700/30 dark:border-gray-600/30 backdrop-blur-sm"
                  >
                    <div className="flex items-center mb-5">
                      <div className="relative">
                        <img
                          className="w-12 h-12 rounded-full mr-4 border-2 border-green-500/50 dark:border-green-400/50 object-cover"
                          src={`https://placehold.co/600/fefefe/285231/png?font=roboto&text=${testimonial.name.charAt(0)}`}
                          alt={testimonial.name}
                        />
                        <div className="absolute -bottom-1 -right-1 bg-green-500 dark:bg-green-400 rounded-full w-4 h-4 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-green-400 dark:text-green-300">{testimonial.name}</h3>
                        <p className="text-sm text-gray-400 dark:text-gray-300">{testimonial.handle}</p>
                      </div>
                    </div>

                    <div className="relative mb-5">
                      <svg className="absolute -top-3 -left-2 w-8 h-8 text-green-500/20 dark:text-green-400/20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="text-gray-300 dark:text-gray-200 mb-4 pl-6">{testimonial.text}</p>
                    </div>

                    {testimonial.link && (
                      <a
                        href={`https://${testimonial.link}`}
                        className="inline-flex items-center text-green-400 dark:text-green-300 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                        </svg>
                        {testimonial.link}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-gray-800 dark:from-gray-700 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-800 dark:from-gray-700 to-transparent" />
        </div>
      </div>
    </div>
  );
};
export default Testimonials;