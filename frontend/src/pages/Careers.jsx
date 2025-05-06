import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaMapMarkerAlt, FaCalendarAlt, FaMoneyBillWave, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Careers = () => {
  const { t } = useTranslation();
  const [activeJobId, setActiveJobId] = useState(null);

  // Toggle job details
  const toggleJobDetails = (id) => {
    setActiveJobId(activeJobId === id ? null : id);
  };

  // Job listings data
  const jobListings = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      department: 'Technology',
      location: 'Bangalore, India (Hybrid)',
      type: 'Full-time',
      salary: '₹18-25 LPA',
      posted: '2 weeks ago',
      description: 'We are looking for an experienced Full Stack Developer to join our technology team. You will be responsible for developing and maintaining our web applications, working with both frontend and backend technologies.',
      responsibilities: [
        'Design and develop high-quality web applications using React, Node.js, and MongoDB',
        'Collaborate with cross-functional teams to define, design, and ship new features',
        'Optimize applications for maximum speed and scalability',
        'Implement security and data protection measures',
        'Participate in code reviews and mentor junior developers'
      ],
      requirements: [
        '5+ years of experience in full stack development',
        'Proficiency in React, Node.js, and MongoDB',
        'Experience with RESTful APIs and microservices architecture',
        'Strong understanding of web security best practices',
        'Excellent problem-solving skills and attention to detail'
      ]
    },
    {
      id: 2,
      title: 'Agricultural Data Scientist',
      department: 'Agriculture',
      location: 'Delhi, India (Remote)',
      type: 'Full-time',
      salary: '₹15-20 LPA',
      posted: '1 week ago',
      description: 'Join our team as an Agricultural Data Scientist to analyze farming data and develop models that help farmers make better decisions. You will work with our agricultural experts to create innovative solutions for crop recommendations and yield predictions.',
      responsibilities: [
        'Develop machine learning models for crop recommendation systems',
        'Analyze agricultural data to identify patterns and insights',
        'Create data visualization tools for farmers and stakeholders',
        'Collaborate with agricultural experts to validate models',
        'Stay updated with the latest research in agricultural data science'
      ],
      requirements: [
        'Masters or PhD in Data Science, Agricultural Science, or related field',
        'Experience with machine learning and statistical analysis',
        'Knowledge of Python, R, and data visualization tools',
        'Understanding of agricultural systems and challenges',
        'Strong communication skills to explain complex models to non-technical stakeholders'
      ]
    },
    {
      id: 3,
      title: 'Customer Success Manager',
      department: 'Support',
      location: 'Mumbai, India (On-site)',
      type: 'Full-time',
      salary: '₹10-15 LPA',
      posted: '3 days ago',
      description: 'We are seeking a Customer Success Manager to ensure our farmer clients get the most value from our platform. You will be the bridge between our users and our product team, helping farmers adopt our technology and providing feedback for product improvements.',
      responsibilities: [
        'Onboard new farmers to the FarmSetu platform',
        'Provide training and support to ensure successful adoption',
        'Collect and analyze user feedback to improve the product',
        'Develop strategies to increase user engagement and retention',
        'Work with the product team to implement user-requested features'
      ],
      requirements: [
        '3+ years of experience in customer success or account management',
        'Strong understanding of agricultural practices and challenges',
        'Excellent communication and interpersonal skills',
        'Ability to travel to rural areas for farmer meetings and training',
        'Fluency in English and at least one regional Indian language'
      ]
    },
    {
      id: 4,
      title: 'UI/UX Designer',
      department: 'Technology',
      location: 'Pune, India (Hybrid)',
      type: 'Full-time',
      salary: '₹12-18 LPA',
      posted: '1 month ago',
      description: 'We are looking for a talented UI/UX Designer to create intuitive and accessible interfaces for our agricultural platform. You will work closely with our development team to design user-friendly experiences that meet the needs of farmers with varying levels of technical literacy.',
      responsibilities: [
        'Design user interfaces for web and mobile applications',
        'Create wireframes, prototypes, and user flows',
        'Conduct user research and usability testing',
        'Develop design systems and style guides',
        'Collaborate with developers to implement designs'
      ],
      requirements: [
        '3+ years of experience in UI/UX design',
        'Proficiency in design tools like Figma, Adobe XD, or Sketch',
        'Portfolio demonstrating strong visual design skills',
        'Experience designing for users with limited technical literacy',
        'Understanding of accessibility standards and best practices'
      ]
    }
  ];

  // Benefits data
  const benefits = [
    {
      title: 'Health & Wellness',
      items: [
        'Comprehensive health insurance for employees and dependents',
        'Mental health support and counseling services',
        'Wellness programs and fitness reimbursements',
        'Paid sick leave and health days'
      ]
    },
    {
      title: 'Work-Life Balance',
      items: [
        'Flexible working hours',
        'Remote work options',
        'Generous paid time off',
        'Parental leave for new parents'
      ]
    },
    {
      title: 'Growth & Development',
      items: [
        'Learning and development budget',
        'Regular skill-building workshops',
        'Conference attendance opportunities',
        'Clear career progression paths'
      ]
    },
    {
      title: 'Perks',
      items: [
        'Competitive salary packages',
        'Employee stock options',
        'Referral bonuses',
        'Team retreats and social events'
      ]
    }
  ];

  // Job card component
  const JobCard = ({ job }) => {
    const isActive = activeJobId === job.id;

    return (
      <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-md mb-5 transition-all duration-300 hover:border-green-600">
        <div
          className="p-5 cursor-pointer flex justify-between items-start"
          onClick={() => toggleJobDetails(job.id)}
        >
          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-1">{job.title}</h3>
            <p className="text-gray-300 text-sm">{job.department}</p>
            <div className="flex flex-wrap gap-3 mt-2">
              <span className="flex items-center text-gray-400 text-xs">
                <FaMapMarkerAlt className="mr-1 text-green-500" /> {job.location}
              </span>
              <span className="flex items-center text-gray-400 text-xs">
                <FaCalendarAlt className="mr-1 text-green-500" /> {job.type}
              </span>
              <span className="flex items-center text-gray-400 text-xs">
                <FaMoneyBillWave className="mr-1 text-green-500" /> {job.salary}
              </span>
            </div>
            <span className="inline-block mt-2 text-xs bg-green-900/40 text-green-400 px-2 py-0.5 rounded-full border border-green-800">
              Posted {job.posted}
            </span>
          </div>
          <div className={`text-green-500 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}>
            <FaChevronDown size={16} />
          </div>
        </div>

        {isActive && (
          <div className="p-5 border-t border-gray-700 bg-gray-800/50">
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">{job.description}</p>

            <h4 className="text-base font-medium text-green-400 mb-2">Responsibilities:</h4>
            <ul className="list-disc pl-5 mb-4 text-gray-300 text-sm space-y-1">
              {job.responsibilities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h4 className="text-base font-medium text-green-400 mb-2">Requirements:</h4>
            <ul className="list-disc pl-5 mb-4 text-gray-300 text-sm space-y-1">
              {job.requirements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <button className="mt-3 bg-green-600 hover:bg-green-700 text-white text-sm py-2 px-5 rounded transition-colors flex items-center">
              Apply Now <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-gray-900 min-h-screen pt-20">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center text-green-500 mb-4">Careers at FarmSetu</h1>
        <p className="text-gray-300 text-center max-w-2xl mx-auto mb-10 text-sm">
          Join our mission to empower farmers with technology and create sustainable agricultural practices across India.
        </p>

        {/* Current openings section */}
        <section className="mb-14">
          <div className="flex items-center mb-6">
            <h2 className="text-xl font-semibold text-green-400">Current Openings</h2>
            <div className="flex-grow ml-4 h-px bg-gradient-to-r from-green-600/50 to-transparent"></div>
          </div>
          <div>
            {jobListings.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </section>

        {/* Benefits section */}
        <section className="mb-14">
          <div className="flex items-center mb-6">
            <h2 className="text-xl font-semibold text-green-400">Benefits & Perks</h2>
            <div className="flex-grow ml-4 h-px bg-gradient-to-r from-green-600/50 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {benefits.map((category, index) => (
              <div key={index} className="bg-gray-800 border border-gray-700 p-5 rounded-lg hover:border-green-600 transition-colors duration-300">
                <h3 className="text-lg font-medium text-green-400 mb-3">{category.title}</h3>
                <ul className="space-y-2">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-green-500 mr-2 text-lg leading-none">•</span>
                      <span className="text-gray-300 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Application process */}
        <section className="mb-8">
          <div className="flex items-center mb-6">
            <h2 className="text-xl font-semibold text-green-400">Our Hiring Process</h2>
            <div className="flex-grow ml-4 h-px bg-gradient-to-r from-green-600/50 to-transparent"></div>
          </div>
          <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg">
            <ol className="space-y-5">
              <li className="flex">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600/70 flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-medium">1</span>
                </div>
                <div>
                  <h3 className="text-base font-medium text-green-400 mb-1">Application Review</h3>
                  <p className="text-gray-300 text-sm">Our team reviews your application and resume to assess your qualifications and experience.</p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600/70 flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-medium">2</span>
                </div>
                <div>
                  <h3 className="text-base font-medium text-green-400 mb-1">Initial Interview</h3>
                  <p className="text-gray-300 text-sm">A video call with our HR team to discuss your background, experience, and interest in FarmSetu.</p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600/70 flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-medium">3</span>
                </div>
                <div>
                  <h3 className="text-base font-medium text-green-400 mb-1">Technical Assessment</h3>
                  <p className="text-gray-300 text-sm">Depending on the role, you may be asked to complete a skills assessment or technical challenge.</p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600/70 flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-medium">4</span>
                </div>
                <div>
                  <h3 className="text-base font-medium text-green-400 mb-1">Team Interviews</h3>
                  <p className="text-gray-300 text-sm">Meet with potential team members and managers to discuss the role in more detail.</p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600/70 flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-medium">5</span>
                </div>
                <div>
                  <h3 className="text-base font-medium text-green-400 mb-1">Offer</h3>
                  <p className="text-gray-300 text-sm">If you're a good fit, we'll extend an offer and welcome you to the FarmSetu family!</p>
                </div>
              </li>
            </ol>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Careers;
