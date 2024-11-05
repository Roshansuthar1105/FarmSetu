import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Raj Patel',
    handle: '@rajpatel',
    text: "🌱 AgriPulse has revolutionized the way I manage my farm. The real-time market information is invaluable. I can quickly access price trends, making informed decisions about when to sell my crops. The negotiation tools have also helped me secure better deals. Highly recommended!",
    link: 'www.agripulse.com',
  },
  {
    name: 'Ananya Singh',
    handle: '@ananyasingh',
    text: 'AgriPulse is a game-changer for farmers. The price negotiation tools are superb, and the market trend analysis is spot-on. I’ve been able to adjust my strategies based on the latest data, which has improved my farm’s profitability significantly.',
  },
  {
    name: 'Vikram Yadav',
    handle: '@vikramyadav',
    text: 'Fantastic app for farmers! The interface is user-friendly and the data is always up-to-date. I particularly appreciate the detailed market insights and historical price data, which help me make better planting and selling decisions.',
  },
  {
    name: 'Neha Sharma',
    handle: '@neha_sharma',
    text: 'I’ve been using AgriPulse for a few months, and it’s been extremely helpful in tracking market trends. The app’s real-time updates and historical data analysis have made a huge difference in how I plan my farming activities.',
  },
  {
    name: 'Amit Kumar',
    handle: '@amitkumar',
    text: 'AgriPulse is a must-have for every farmer. The price discovery features are top-notch! The app provides a comprehensive view of market conditions and price fluctuations, which has been invaluable for my farm management.',
  },
  {
    name: 'Ravi Gupta',
    handle: '@ravigupta',
    text: 'The best agricultural app I’ve come across. It’s packed with features that really help with farm management. From real-time price updates to trend analysis, AgriPulse covers it all. It has become an essential tool for my farming operations.',
    link: 'www.agripulse.com',
  },
  {
    name: 'Sita Devi',
    handle: '@sitadevi',
    text: 'Impressive app with a great user interface. The real-time updates on prices are very useful for making timely decisions. I also appreciate the easy-to-use features for tracking market trends and price changes.',
  },
  {
    name: 'Arjun Verma',
    handle: '@arjun_verma',
    text: 'AgriPulse has made it so much easier to get accurate market information. The app’s analytics tools help me understand market trends better and make data-driven decisions that improve my farm’s profitability.',
  },
  {
    name: 'Maya Rao',
    handle: '@mayarao',
    text: 'A fantastic tool for modern farming. The app’s insights have significantly improved our productivity. The detailed price information and market forecasts allow me to plan my crops more effectively and optimize my yields.',
  },
  {
    name: 'Deepak Singh',
    handle: '@deepaksingh',
    text: 'AgriPulse is a brilliant resource for farmers. It’s user-friendly and provides valuable market data. I especially like the price comparison features that help me find the best prices for my produce.',
  },
  {
    name: 'Kiran Patel',
    handle: '@kiranpatel',
    text: 'Love the app! The features for price tracking and negotiation have been a game-changer for my farm. The app’s detailed market analysis and price prediction tools have helped me make more informed decisions.',
  },
  {
    name: 'Priya Reddy',
    handle: '@priyareddy',
    text: 'AgriPulse has transformed how we approach farming. The app is packed with features that genuinely help. The real-time price updates and market insights have made a significant impact on our farming strategy.',
  },
  {
    name: 'Mohammed Ali',
    handle: '@mohammedali',
    text: 'Great app for anyone in the agriculture sector. The real-time data and tools are incredibly useful. The app’s comprehensive market analysis and price forecasting features are particularly valuable for strategic planning.',
  },
  {
    name: 'Sunita Rao',
    handle: '@sunitarao',
    text: 'The market information and price tools are exactly what we needed. Highly recommend AgriPulse! The app provides detailed insights into market trends and price changes, helping us make better decisions for our farm.',
  },
  {
    name: 'Rajesh Kumar',
    handle: '@rajeshkumar',
    text: 'AgriPulse is a reliable source for market trends and price updates. It has become an essential tool for us. The app’s user-friendly interface and accurate data have made managing our farm much easier.',
  },
  {
    name: 'Anil Sharma',
    handle: '@anilsharma',
    text: 'The app’s features are fantastic. It’s easy to navigate and provides accurate data for farming. The price tracking and market analysis tools have been invaluable for optimizing my farming operations.',
  },
  {
    name: 'Manisha Patel',
    handle: '@manishapatel',
    text: 'AgriPulse has been a valuable asset for my farm. The insights and tools are excellent! The app’s real-time updates and detailed market information have greatly improved our productivity and decision-making.',
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
    text: 'AgriPulse provides all the information I need to manage my farm effectively. Fantastic app! The app’s detailed market insights and price discovery tools have made a significant difference in our farming operations.',
  },
  {
    name: 'Sanjay Sharma',
    handle: '@sanjaysharma',
    text: 'A top-notch app for agriculture. The features for price tracking and market insights are incredibly useful. The app’s real-time data and comprehensive analysis tools have greatly enhanced our farm management.',
  },
  {
    name: 'Seema Patel',
    handle: '@seemapatel',
    text: 'AgriPulse has made it so much easier to manage farm activities and get market data in real time. The app’s user-friendly interface and accurate price updates are essential for making informed farming decisions.',
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
    text: 'AgriPulse is a fantastic tool for modern farmers. The real-time updates and features are very helpful. The app’s comprehensive market analysis and price forecasting tools have greatly enhanced our farming efficiency.',
  },
  {
    name: 'Pooja Sharma',
    handle: '@poojasharma',
    text: 'I love using AgriPulse. It provides valuable insights and is very easy to use. The app’s real-time data and market analysis tools have been essential for making informed decisions and improving our farm’s productivity.',
  },
  {
    name: 'Gaurav Patel',
    handle: '@gauravpatel',
    text: 'A great app for managing farm activities and getting accurate market information. The app’s detailed insights and price tracking tools have made a significant difference in our farming operations.',
  },
  {
    name: 'Divya Reddy',
    handle: '@divyareddy',
    text: 'AgriPulse has been a great addition to our farming toolkit. The features are very useful. The app’s real-time updates and comprehensive market analysis have greatly improved our decision-making and farm management.',
  },
  {
    name: 'Manoj Yadav',
    handle: '@manojyadav',
    text: 'The best app for farmers. The data and tools provided are top-notch. The app’s real-time price updates and market insights have been invaluable for optimizing our farming strategies and productivity.',
  },
  {
    name: 'Sonia Singh',
    handle: '@soniasingh',
    text: 'AgriPulse is an amazing app with valuable features for farm management. Highly recommended! The app’s detailed market analysis and price tracking tools have significantly improved our farming operations.',
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
    text: 'AgriPulse is an excellent resource for farmers. The features are very helpful for managing farm activities. The app’s comprehensive market data and real-time price updates have been crucial for making informed decisions.',
  },
  {
    name: 'Preeti Rao',
    handle: '@preetirao',
    text: 'The app’s market insights and tools are incredibly useful. I highly recommend AgriPulse! The real-time updates and detailed analysis have greatly improved our farm management and decision-making processes.',
  },
  {
    name: 'Harish Kumar',
    handle: '@harishkumar',
    text: 'AgriPulse has made farming much easier with its real-time data and user-friendly features. The app’s comprehensive market analysis and price tracking tools have been essential for optimizing our farming strategies.',
  },
  {
    name: 'Neelam Singh',
    handle: '@neelamsingh',
    text: 'An outstanding app for agriculture. The market data and features are top-notch. The app’s real-time updates and detailed insights have greatly enhanced our farm management and productivity.',
  },
  {
    name: 'Deepika Patel',
    handle: '@deepikapatel',
    text: 'I am very impressed with AgriPulse. It’s a great tool for farm management and market information. The app’s real-time price updates and comprehensive market analysis have been invaluable for improving our farming operations.',
  },
  {
    name: 'Rajiv Sharma',
    handle: '@rajivsharma',
    text: 'AgriPulse provides all the tools and information I need to manage my farm effectively. The real-time updates and detailed market insights have significantly improved our farm management and decision-making.',
  },
];

const Testimonials = () => {
  // Number of testimonials per column
  const testimonialsPerColumn = 3;

  // Split testimonials into columns
  const columns = Array.from({ length: Math.ceil(testimonials.length / testimonialsPerColumn) }, (_, index) => 
    testimonials.slice(index * testimonialsPerColumn, index * testimonialsPerColumn + testimonialsPerColumn)
  );

  return (
    <div className="bg-gray-800 text-white p-8 relative overflow-hidden">
      <h2 className="text-3xl font-bold mb-4 text-center text-green-300">Loved by thousands of farmers</h2>
      <p className="text-center mb-8 text-gray-300">Here's what some of our users have to say about AgriPulse.</p>
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
                  className="bg-gray-900 p-4 rounded-lg shadow-lg"
                >
                  <div className="flex items-center mb-4">
                    <img
                      className="w-10 h-10 rounded-full mr-4"
                      src={`https://placehold.co/600/fefefe/285231/png?font=roboto&text=${testimonial.name.charAt(0)}`}
                      alt={testimonial.name}
                    />
                    <div>
                      <h3 className="text-lg font-bold text-green-400">{testimonial.name}</h3>
                      <p className="text-sm text-gray-400">{testimonial.handle}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">{testimonial.text}</p>
                  {testimonial.link && (
                    <a
                      href={`https://${testimonial.link}`}
                      className="text-green-300 hover:underline"
                    >
                      {testimonial.link}
                    </a>
                  )}
                </div>
              ))}
            </div>
          ))}
        </motion.div>
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-gray-800 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-800 to-transparent" />
      </div>
    </div>
  );
};
export default Testimonials;