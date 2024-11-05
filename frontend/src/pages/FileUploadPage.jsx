import React, { useState } from "react";
import { FileUpload } from '../components/ui/FileUpload';
import MyNavbar from "../components/MyNavbar";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';

export default function FileUploadPage() {
  const [files, setFiles] = useState([]);

  const handleFileUpload = (uploadedFiles) => {
    setFiles(uploadedFiles);
    console.log(uploadedFiles);
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-900 text-neutral-200">
      {/* Navbar at the top */}
      <MyNavbar />

      {/* Main content */}
      <main className="flex-grow w-full max-w-4xl mx-auto py-8 mt-16 flex flex-col items-center justify-center">
        <div className="w-full min-h-96 border border-dashed border-neutral-700 rounded-lg p-6 bg-neutral-800">
          <FileUpload onChange={handleFileUpload} />
        </div>

        {/* Link to the next page */}
        <Link to="/form">
          <button
            className="mt-6 px-6 py-3 bg-green-700 text-neutral-100 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-200"
          >
            <span className="mr-2">Next</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </Link>
      </main>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
}
