// src/components/CourseCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <Link
      to={`/courses/${course.id}`}
      className="block bg-gray-800 text-gray-200 shadow-lg rounded-lg p-6 mb-6 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out"
    >
      <div>
        <h2 className="text-2xl font-bold mb-2 text-green-400 transition-colors duration-300 ease-in-out hover:text-green-300">
          {course.title}
        </h2>
        <p className="text-gray-300 mb-2">{course.description}</p>
        <p className="text-gray-400 mb-2">Language: {course.language}</p>
      </div>
    </Link>
  );
};

export default CourseCard;
