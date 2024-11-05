import React from 'react';
import { useParams } from 'react-router-dom';
import { Accordion, AccordionItem } from '@nextui-org/react'; // Importing NextUI's Accordion component
import courses from '../data/courses.json'; // Adjust the path as needed
import MyNavbar from '../components/MyNavbar'; // Import the Navbar component
import Footer from '../components/Footer'; // Import the Footer component

const CourseDetails = () => {
  const { id } = useParams();
  const course = courses.find((course) => course.id === id);

  if (!course) {
    return <p className="text-center text-red-500">Course not found.</p>;
  }

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      <MyNavbar /> {/* Add the Navbar */}
      <div className="max-w-3xl mx-auto my-8 p-4 pt-24">
        <h1 className="text-4xl font-bold mb-4 text-green-400 transition-transform duration-300 ease-in-out transform hover:scale-105">
          {course.title}
        </h1>
        <p className="text-xl mb-4">{course.description}</p>
        <p className="text-gray-400 mb-4">Language: <span className="text-green-400">{course.language}</span></p>
        <div>
          <h2 className="text-2xl font-bold mb-2 text-green-300">Course Content</h2>
          <p className="bg-gray-800 p-4 rounded-lg shadow-lg">{course.content}</p>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-2 text-green-300">Related Videos</h2>
          <Accordion className="bg-gray-800 border border-gray-700 rounded-lg">
            {course.videoIds.map((videoId, index) => (
              <AccordionItem
                key={index}
                title={<span className="text-white">Video {index + 1}</span>}
                className="bg-gray-800 border-b border-gray-700"
              >
                <div className="mb-4" style={{ height: '500px' }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={`${course.title} Video ${index + 1}`}
                    className="w-full h-full rounded-lg shadow-lg"
                    allowFullScreen
                  />
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      <Footer /> {/* Add the Footer */}
    </div>
  );
};

export default CourseDetails;
