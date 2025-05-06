import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCalendarAlt, FaDownload, FaExternalLinkAlt, FaEnvelope, FaPhone } from 'react-icons/fa';

const Press = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('press-releases');

  // Press releases data
  const pressReleases = [
    {
      id: 1,
      title: 'FarmSetu Raises $10 Million in Series A Funding to Expand Agricultural Technology Platform',
      date: 'May 15, 2023',
      summary: 'FarmSetu, the leading agricultural technology platform in India, today announced it has raised $10 million in Series A funding led by Accel Partners, with participation from existing investors Omnivore and Blume Ventures.',
      content: `
        <p>FarmSetu, the leading agricultural technology platform in India, today announced it has raised $10 million in Series A funding led by Accel Partners, with participation from existing investors Omnivore and Blume Ventures.</p>

        <p>The new funding will be used to expand FarmSetu\'s technology platform, which provides farmers with crop recommendations, market insights, weather updates, and expert consultation. The company plans to extend its reach to more states across India and develop new features to support sustainable farming practices.</p>

        <p>"This investment will help us accelerate our mission to empower farmers with technology and create a more sustainable agricultural ecosystem in India," said Rajesh Kumar, CEO and Founder of FarmSetu. "We're excited to partner with Accel and our existing investors to bring our platform to more farmers across the country."</p>

        <p>Since its launch in 2021, FarmSetu has helped over 100,000 farmers increase their crop yields by an average of 30% while reducing water usage and chemical inputs. The platform uses artificial intelligence and machine learning to provide personalized recommendations based on soil conditions, weather patterns, and market trends.</p>

        <p>"FarmSetu is addressing critical challenges in Indian agriculture through innovative technology," said Prashanth Prakash, Partner at Accel. "We're impressed by their growth and impact on farmers' livelihoods, and we believe they have the potential to transform agriculture in India and beyond."</p>
      `
    },
    {
      id: 2,
      title: 'FarmSetu Launches New Mobile App for Farmers',
      date: 'August 22, 2023',
      summary: 'FarmSetu today announced the launch of its new mobile application designed to provide farmers with easy access to agricultural information and services, even in areas with limited internet connectivity.',
      content: `
        <p>FarmSetu today announced the launch of its new mobile application designed to provide farmers with easy access to agricultural information and services, even in areas with limited internet connectivity.</p>

        <p>The new app, available on Android and iOS, features an offline mode that allows farmers to access critical information without an internet connection. It also includes a simplified user interface with voice commands in multiple Indian languages, making it accessible to farmers with varying levels of literacy and technical expertise.</p>

        <p>"We understand the challenges that farmers face in accessing digital services, especially in rural areas with limited connectivity," said Priya Sharma, CTO of FarmSetu. "Our new app is designed to overcome these barriers and ensure that every farmer can benefit from our platform, regardless of their location or technical skills."</p>

        <p>Key features of the new app include:</p>
        <ul>
          <li>Offline access to crop recommendations and farming guides</li>
          <li>Voice-based interface in 10 Indian languages</li>
          <li>Low-bandwidth mode for areas with poor connectivity</li>
          <li>Integration with local weather services for accurate forecasts</li>
          <li>Direct connection to agricultural experts for consultation</li>
        </ul>

        <p>The app is being rolled out in phases across different states, starting with Maharashtra, Punjab, and Karnataka, with plans to cover all of India by the end of the year.</p>
      `
    },
    {
      id: 3,
      title: 'FarmSetu Partners with Government of Maharashtra for Sustainable Farming Initiative',
      date: 'November 10, 2023',
      summary: 'FarmSetu has announced a strategic partnership with the Government of Maharashtra to promote sustainable farming practices and support small-scale farmers across the state.',
      content: `
        <p>FarmSetu has announced a strategic partnership with the Government of Maharashtra to promote sustainable farming practices and support small-scale farmers across the state.</p>

        <p>The partnership, which is part of the state's Agricultural Modernization Program, will provide 50,000 farmers with access to FarmSetu\'s technology platform at subsidized rates. The initiative aims to increase farm productivity, reduce environmental impact, and improve farmers' incomes through the adoption of data-driven farming techniques.</p>

        <p>"This partnership represents a significant step forward in our efforts to modernize agriculture in Maharashtra," said the State Minister for Agriculture. "By combining the government's reach with FarmSetu\'s technology, we can help farmers make more informed decisions and adopt sustainable practices that benefit both their livelihoods and the environment."</p>

        <p>As part of the program, FarmSetu will conduct training workshops in rural communities to help farmers understand and utilize the platform effectively. The company will also work with local agricultural universities to develop region-specific crop recommendations and best practices.</p>

        <p>"We're honored to partner with the Government of Maharashtra on this important initiative," said Amit Patel, COO of FarmSetu. "This collaboration will allow us to reach farmers who might otherwise not have access to advanced agricultural technology, and help them improve their yields and incomes while practicing sustainable farming."</p>

        <p>The program will initially focus on six districts in Maharashtra, with plans to expand to the entire state within two years.</p>
      `
    }
  ];

  // Media coverage data
  const mediaCoverage = [
    {
      id: 1,
      title: 'How FarmSetu is Revolutionizing Agriculture in India',
      publication: 'Tech Today',
      date: 'June 5, 2023',
      summary: 'An in-depth look at how FarmSetu is using technology to transform farming practices across India.',
      link: 'https://example.com/tech-today-farmsetu'
    },
    {
      id: 2,
      title: 'The Future of Farming: FarmSetu\'s AI-Driven Approach',
      publication: 'Agricultural Innovation',
      date: 'July 18, 2023',
      summary: 'A feature on FarmSetu\'s use of artificial intelligence and machine learning to provide personalized recommendations to farmers.',
      link: 'https://example.com/agricultural-innovation-farmsetu'
    },
    {
      id: 3,
      title: 'FarmSetu CEO Discusses Series A Funding and Future Plans',
      publication: 'Business Standard',
      date: 'May 20, 2023',
      summary: 'An interview with Rajesh Kumar on the recent funding round and the company\'s vision for the future of agriculture.',
      link: 'https://example.com/business-standard-farmsetu'
    },
    {
      id: 4,
      title: 'How Technology is Helping Indian Farmers: The FarmSetu Story',
      publication: 'Rural Development Today',
      date: 'September 12, 2023',
      summary: 'A case study on how FarmSetu\'s platform has helped farmers in rural India increase their yields and incomes.',
      link: 'https://example.com/rural-development-farmsetu'
    },
    {
      id: 5,
      title: 'FarmSetu Named in "Top 50 AgTech Startups" List',
      publication: 'Startup Insider',
      date: 'October 3, 2023',
      summary: 'FarmSetu has been recognized as one of the top 50 agricultural technology startups globally in the annual ranking by Startup Insider.',
      link: 'https://example.com/startup-insider-farmsetu'
    }
  ];

  // Media kit resources
  const mediaKitResources = [
    {
      title: 'FarmSetu Logo Package',
      description: 'Official logos in various formats (PNG, SVG, EPS) with usage guidelines.',
      fileSize: '5.2 MB',
      downloadLink: '/downloads/farmsetu-logo-package.zip'
    },
    {
      title: 'Product Screenshots',
      description: 'High-resolution screenshots of the FarmSetu platform and mobile app.',
      fileSize: '12.8 MB',
      downloadLink: '/downloads/farmsetu-screenshots.zip'
    },
    {
      title: 'Brand Guidelines',
      description: 'Comprehensive guide to FarmSetu\'s brand identity, including colors, typography, and tone of voice.',
      fileSize: '3.7 MB',
      downloadLink: '/downloads/farmsetu-brand-guidelines.pdf'
    },
    {
      title: 'Executive Headshots',
      description: 'Professional photographs of FarmSetu\'s leadership team.',
      fileSize: '8.5 MB',
      downloadLink: '/downloads/farmsetu-executive-headshots.zip'
    },
    {
      title: 'Company Fact Sheet',
      description: 'Key information about FarmSetu, including founding date, mission, user statistics, and achievements.',
      fileSize: '1.2 MB',
      downloadLink: '/downloads/farmsetu-fact-sheet.pdf'
    }
  ];

  // Press release detail component
  const PressReleaseDetail = ({ release }) => (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-5 mb-6 hover:border-green-600 transition-colors duration-300">
      <h3 className="text-lg font-semibold text-green-400 mb-2">{release.title}</h3>
      <div className="flex items-center text-gray-400 mb-4 text-xs">
        <FaCalendarAlt className="mr-2 text-green-500" />
        <span>{release.date}</span>
      </div>
      <div className="text-gray-300 prose prose-invert max-w-none text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: release.content }} />
    </div>
  );

  // Media coverage card component
  const MediaCoverageCard = ({ article }) => (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-5 mb-4 transition-all duration-300 hover:border-green-600">
      <h3 className="text-base font-medium text-green-400 mb-2">{article.title}</h3>
      <div className="flex justify-between items-center mb-3 text-xs">
        <span className="text-gray-300 font-medium">{article.publication}</span>
        <span className="text-gray-400 flex items-center">
          <FaCalendarAlt className="mr-1 text-green-500" /> {article.date}
        </span>
      </div>
      <p className="text-gray-300 text-sm mb-4 line-clamp-3">{article.summary}</p>
      <a
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-green-400 hover:text-green-300 text-sm"
      >
        Read Article <FaExternalLinkAlt className="ml-1 h-3 w-3" />
      </a>
    </div>
  );

  // Media kit resource card component
  const MediaKitResourceCard = ({ resource }) => (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-3 flex justify-between items-center hover:border-green-600 transition-colors duration-300">
      <div className="pr-4">
        <h3 className="text-base font-medium text-green-400 mb-1">{resource.title}</h3>
        <p className="text-gray-300 text-sm mb-1">{resource.description}</p>
        <span className="text-gray-400 text-xs">{resource.fileSize}</span>
      </div>
      <a
        href={resource.downloadLink}
        className="bg-gray-700 hover:bg-green-600 text-white text-sm py-2 px-3 rounded flex items-center transition-colors whitespace-nowrap flex-shrink-0"
      >
        <FaDownload className="mr-1 h-3 w-3" /> Download
      </a>
    </div>
  );

  return (
    <div className="bg-gray-900 min-h-screen pt-20">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center text-green-500 mb-4">Press & Media</h1>
        <p className="text-gray-300 text-center max-w-2xl mx-auto mb-8 text-sm">
          Find the latest news, media resources, and contact information for press inquiries about FarmSetu.
        </p>

        {/* Tab navigation */}
        <div className="flex flex-wrap justify-center border-b border-gray-700 mb-8">
          <button
            className={`px-4 py-2 font-medium text-sm focus:outline-none transition-colors duration-200 ${
              activeTab === 'press-releases'
                ? 'text-green-400 border-b-2 border-green-500'
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('press-releases')}
          >
            Press Releases
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm focus:outline-none transition-colors duration-200 ${
              activeTab === 'media-coverage'
                ? 'text-green-400 border-b-2 border-green-500'
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('media-coverage')}
          >
            Media Coverage
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm focus:outline-none transition-colors duration-200 ${
              activeTab === 'media-kit'
                ? 'text-green-400 border-b-2 border-green-500'
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('media-kit')}
          >
            Media Kit
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm focus:outline-none transition-colors duration-200 ${
              activeTab === 'contact'
                ? 'text-green-400 border-b-2 border-green-500'
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('contact')}
          >
            Media Contact
          </button>
        </div>

        {/* Tab content */}
        <div className="mt-6">
          {/* Press Releases */}
          {activeTab === 'press-releases' && (
            <div>
              <div className="flex items-center mb-5">
                <h2 className="text-xl font-semibold text-green-400">Latest Press Releases</h2>
                <div className="flex-grow ml-4 h-px bg-gradient-to-r from-green-600/50 to-transparent"></div>
              </div>
              {pressReleases.map(release => (
                <PressReleaseDetail key={release.id} release={release} />
              ))}
            </div>
          )}

          {/* Media Coverage */}
          {activeTab === 'media-coverage' && (
            <div>
              <div className="flex items-center mb-5">
                <h2 className="text-xl font-semibold text-green-400">FarmSetu in the News</h2>
                <div className="flex-grow ml-4 h-px bg-gradient-to-r from-green-600/50 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {mediaCoverage.map(article => (
                  <MediaCoverageCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          )}

          {/* Media Kit */}
          {activeTab === 'media-kit' && (
            <div>
              <div className="flex items-center mb-5">
                <h2 className="text-xl font-semibold text-green-400">Media Resources</h2>
                <div className="flex-grow ml-4 h-px bg-gradient-to-r from-green-600/50 to-transparent"></div>
              </div>
              <p className="text-gray-300 mb-5 text-sm">
                Download official FarmSetu assets for media use. All resources are available for press purposes with proper attribution to FarmSetu.
              </p>
              <div className="space-y-3">
                {mediaKitResources.map((resource, index) => (
                  <MediaKitResourceCard key={index} resource={resource} />
                ))}
              </div>
            </div>
          )}

          {/* Media Contact */}
          {activeTab === 'contact' && (
            <div>
              <div className="flex items-center mb-5">
                <h2 className="text-xl font-semibold text-green-400">Media Contact Information</h2>
                <div className="flex-grow ml-4 h-px bg-gradient-to-r from-green-600/50 to-transparent"></div>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-5">
                <h3 className="text-lg font-medium text-green-400 mb-3">Press Inquiries</h3>
                <p className="text-gray-300 text-sm mb-5">
                  For press inquiries, interview requests, or additional information about FarmSetu, please contact our media relations team:
                </p>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <FaEnvelope className="text-green-500 mt-1 mr-3" />
                    <div>
                      <h4 className="text-base font-medium text-gray-200 mb-1">Email</h4>
                      <a href="mailto:press@farmsetu.com" className="text-green-400 hover:text-green-300 text-sm">
                        press@farmsetu.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FaPhone className="text-green-500 mt-1 mr-3" />
                    <div>
                      <h4 className="text-base font-medium text-gray-200 mb-1">Phone</h4>
                      <p className="text-gray-300 text-sm">+91 98765 43210</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-900 rounded border border-gray-700">
                  <h4 className="text-base font-medium text-gray-200 mb-2">Response Time</h4>
                  <p className="text-gray-300 text-sm">
                    We strive to respond to all media inquiries within 24 hours during business days. For urgent inquiries, please indicate "Urgent" in your email subject line.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Press;
