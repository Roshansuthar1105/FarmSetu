import Footer from '../components/Footer';
import MyNavbar from '../components/MyNavbar';
const About = () => {
    return (
        <div className="bg-gray-800 min-h-screen">
            <MyNavbar/>
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold text-green-600 text-center mb-12">About FarmSetu</h1>
                
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold text-gray-100">Our Mission</h2>
                        <p className="text-gray-300">
                            At FarmSetu, we are dedicated to revolutionizing agriculture through technology and innovation. 
                            Our mission is to empower farmers with modern tools, knowledge, and resources to enhance their 
                            productivity and sustainability.
                        </p>
                        
                        <h2 className="text-2xl font-semibold text-gray-200">What We Do</h2>
                        <p className="text-gray-300">
                            We provide a comprehensive platform that connects farmers with quality agricultural products, 
                            expert advice, and innovative farming solutions. From premium seeds to advanced machinery, 
                            we ensure farmers have access to everything they need for successful farming.
                        </p>
                    </div>
                    
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold text-gray-200">Our Values</h2>
                        <ul className="space-y-4 text-gray-300">
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                                <span>Sustainability in farming practices</span>
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                                <span>Innovation in agricultural technology</span>
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                                <span>Quality and reliability in products</span>
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                                <span>Farmer-centric approach</span>
                            </li>
                        </ul>
                        
                        <h2 className="text-2xl font-semibold text-gray-200">Our Impact</h2>
                            <p className="text-gray-300">
                            We have helped thousands of farmers across India modernize their farming practices, 
                            increase their yields, and achieve better market prices for their produce. Our 
                            commitment to agricultural excellence continues to drive positive change in the 
                            farming community.
                        </p>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default About;
