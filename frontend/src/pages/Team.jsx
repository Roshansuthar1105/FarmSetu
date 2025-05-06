import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaLinkedin, FaGithub, FaEnvelope, FaCode, FaServer, FaBrain, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Team = () => {
  const { t } = useTranslation();

  // Team members data
  const teamMembers = [
    {
      name: 'Roshan Suthar',
      role: 'MERN Stack Developer',
      bio: 'Full-stack developer with expertise in MongoDB, Express, React, and Node.js. Passionate about building scalable web applications and creating intuitive user experiences for agricultural technology solutions.',
      image: 'https://media.licdn.com/dms/image/v2/D4D03AQFRLMK-sgnCWg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1722561339257?e=2147483647&v=beta&t=fKbtOqDdelHcrWBdi9tQ4GqG5ONIHW4B8uT12QhDiCg',
      icon: <FaCode className="text-green-400" />,
      experience: '4+ years experience',
      education: 'B.Tech in Computer Science, IIT Delhi',
      skills: ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'Redux', 'Tailwind CSS'],
      projects: [
        'FarmSetu Web Application',
        'Agricultural E-commerce Platform',
        'Farmer Community Portal',
        'Real-time Crop Monitoring Dashboard'
      ],
      social: {
        linkedin: 'https://linkedin.com/in/roshan-suthar',
        github: 'https://github.com/roshan-suthar',
        email: 'mailto:roshan@farmsetu.com'
      }
    },
    {
      name: 'Himanshu',
      role: 'Backend Developer',
      bio: 'Specialized in building robust backend systems and APIs. Experienced in database design, server architecture, and performance optimization for high-traffic applications in the agricultural sector.',
      image: 'https://media.licdn.com/dms/image/v2/D4D03AQF2HP3Xm6wkKQ/profile-displayphoto-shrink_200_200/B4DZT1wYfWG8AY-/0/1739289890029?e=2147483647&v=beta&t=FijqInW1sVFOFbTP58tJnN_nmjbzrOZV74ILKEnSC-o',
      icon: <FaServer className="text-green-400" />,
      experience: '5+ years experience',
      education: 'M.Tech in Software Engineering, NIT Warangal',
      skills: ['Node.js', 'Python', 'SQL', 'AWS', 'Docker', 'Microservices', 'GraphQL'],
      projects: [
        'FarmSetu API Architecture',
        'Weather Data Integration System',
        'Crop Recommendation Engine',
        'Farmer Authentication Service'
      ],
      social: {
        linkedin: 'https://linkedin.com/in/himanshu-dev',
        github: 'https://github.com/himanshu-dev',
        email: 'mailto:himanshu@farmsetu.com'
      }
    },
    {
      name: 'Shreya',
      role: 'Machine Learning Developer',
      bio: 'AI and machine learning expert focused on agricultural applications. Develops predictive models for crop recommendations, disease detection, and yield optimization to help farmers make data-driven decisions.',
      image: 'data:image/jpeg;base64,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',
      icon: <FaBrain className="text-green-400" />,
      experience: '3+ years experience',
      education: 'M.S. in Artificial Intelligence, Stanford University',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'Data Analysis', 'Computer Vision', 'NLP', 'Scikit-learn'],
      projects: [
        'Crop Disease Detection System',
        'Soil Quality Analysis Model',
        'Yield Prediction Algorithm',
        'Weather Pattern Recognition'
      ],
      social: {
        linkedin: 'https://linkedin.com/in/shreya-ml',
        github: 'https://github.com/shreya-ml',
        email: 'mailto:shreya@farmsetu.com'
      }
    }
  ];

  // Team member card component
  const TeamMemberCard = ({ member }) => (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-green-500/30 hover:border-green-500 flex flex-col h-full group">
      {/* Header with circular image */}
      <div className="relative pt-8 px-6 flex flex-col items-center">
        {/* Role icon badge */}
        <div className="absolute top-4 right-4 bg-green-600/20 p-2 rounded-full">
          {member.icon}
        </div>

        {/* Circular profile image */}
        <div className="w-32 h-32 rounded-full border-4 border-green-500/30 overflow-hidden mb-4 group-hover:border-green-500 transition-colors duration-300 shadow-lg">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name and role */}
        <h3 className="text-xl font-bold text-white mb-1 text-center">{member.name}</h3>
        <p className="text-green-400 text-sm font-medium mb-3 text-center">{member.role}</p>

        {/* Experience badge */}
        <div className="bg-gray-800/80 px-3 py-1 rounded-full text-xs text-gray-300 mb-4">
          {member.experience || '3+ years experience'}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-grow flex flex-col bg-gray-800/50">
        <p className="text-gray-300 text-sm mb-4 leading-relaxed flex-grow">{member.bio}</p>

        {/* Education */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-green-400 mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
            Education
          </h4>
          <p className="text-gray-300 text-xs ml-6">
            {member.education || 'B.Tech in Computer Science'}
          </p>
        </div>

        {/* Skills */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-green-400 mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Skills
          </h4>
          <div className="flex flex-wrap gap-2 ml-6">
            {member.skills.map((skill, index) => (
              <span key={index} className="bg-gray-700 text-xs text-gray-300 px-2 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-green-400 mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Notable Projects
          </h4>
          <ul className="list-disc list-inside text-gray-300 text-xs ml-6 space-y-1">
            {member.projects ? (
              member.projects.map((project, index) => (
                <li key={index}>{project}</li>
              ))
            ) : (
              <>
                <li>FarmSetu Web Application</li>
                <li>Agricultural Data Analytics Platform</li>
              </>
            )}
          </ul>
        </div>

        {/* Social links */}
        <div className="flex space-x-3 mt-auto pt-3 border-t border-gray-700">
          {member.social.linkedin && (
            <a
              href={member.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-700 p-2 rounded-full text-gray-400 hover:text-white hover:bg-[#0077b5] transition-colors"
              aria-label={`${member.name}'s LinkedIn`}
            >
              <FaLinkedin size={16} />
            </a>
          )}
          {member.social.github && (
            <a
              href={member.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-700 p-2 rounded-full text-gray-400 hover:text-white hover:bg-[#333] transition-colors"
              aria-label={`${member.name}'s GitHub`}
            >
              <FaGithub size={16} />
            </a>
          )}
          {member.social.email && (
            <a
              href={member.social.email}
              className="bg-gray-700 p-2 rounded-full text-gray-400 hover:text-white hover:bg-green-600 transition-colors"
              aria-label={`Email ${member.name}`}
            >
              <FaEnvelope size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-900 min-h-screen pt-20">
      <div className="container mx-auto px-4 py-10">
        {/* Header with gradient background */}
        <div className="relative mb-16 py-10 px-6 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/40 to-gray-800/40 rounded-xl"></div>
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">Meet Our Team</h1>
            <p className="text-gray-300 text-center max-w-2xl mx-auto text-sm md:text-base">
              The talented developers behind FarmSetu who are dedicated to transforming agriculture through technology and innovation.
            </p>
          </div>
        </div>

        {/* Team members section */}
        <section className="mb-20">
          <div className="flex items-center mb-8">
            <h2 className="text-xl font-semibold text-green-400">Development Team</h2>
            <div className="flex-grow ml-4 h-px bg-gradient-to-r from-green-600/50 to-transparent"></div>
          </div>

          {/* Display team members in a grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={index} member={member} />
            ))}
          </div>
        </section>

        {/* Team values section */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <h2 className="text-xl font-semibold text-green-400">Our Values</h2>
            <div className="flex-grow ml-4 h-px bg-gradient-to-r from-green-600/50 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg hover:border-green-600 transition-all duration-300 hover:shadow-lg hover:shadow-green-900/20">
              <div className="bg-green-600/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-green-400 mb-3">Innovation</h3>
              <p className="text-gray-300 text-sm">
                We constantly push the boundaries of what's possible in agricultural technology, seeking creative solutions to complex farming challenges.
              </p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg hover:border-green-600 transition-all duration-300 hover:shadow-lg hover:shadow-green-900/20">
              <div className="bg-green-600/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-green-400 mb-3">Sustainability</h3>
              <p className="text-gray-300 text-sm">
                We're committed to promoting sustainable farming practices that protect the environment while improving productivity and livelihoods.
              </p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg hover:border-green-600 transition-all duration-300 hover:shadow-lg hover:shadow-green-900/20">
              <div className="bg-green-600/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-green-400 mb-3">Empowerment</h3>
              <p className="text-gray-300 text-sm">
                We believe in empowering farmers with the knowledge and tools they need to make informed decisions and improve their agricultural outcomes.
              </p>
            </div>
          </div>
        </section>

        {/* Join our team section */}
        <section className="bg-gradient-to-r from-green-900/30 to-gray-800/30 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Join Our Team</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">
            We're always looking for talented individuals who are passionate about using technology to transform agriculture.
          </p>
          <a href="/careers" className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
            View Open Positions
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </section>
      </div>
    </div>
  );
};

export default Team;
