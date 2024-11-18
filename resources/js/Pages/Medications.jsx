import "../../css/app.css";  // Ensure you import the necessary CSS
import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia"; // Inertia for navigation and API calls
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import ReadableLabeling from "./ReadableLabeling"; // For rendering the readable labeling
import { Head } from "@inertiajs/react"; // Inertia Head component
import LabelingBackgroundImage from '../../../public/static/images/labeling-bg.jpeg'; // Background image for the page

const Medications = ({ labelingInfo, error, medicationName }) => {
  const [medication, setMedication] = useState(medicationName || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    Inertia.get('/labeling', { medicationName: medication }); // Use Inertia to make a request to the server
  };

  return (
    <div className="wrapper flex-col min-h-screen grow">
      <Head title="FDA Labeling Information" />
      
      {/* Background Image */}
      <img 
        src={LabelingBackgroundImage} 
        alt="Background" 
        className="-z-10 absolute mx-auto w-screen h-[90%] left-0 right-0 bg-no-repeat blur-sm"
      />

      {/* Navbar */}
      <Navbar />

      <div className="m-auto z-10">
        <section className="content p-4">
          {/* Main Content */}
          <h1 className="text-4xl font-bold text-center mb-8 text-white">FDA Labeling Information</h1>
          
          {/* Form for Medication Name */}
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <input
              type="text"
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
              placeholder="Enter medication name"
              required
              className="border border-gray-300 p-2 rounded-lg w-full mb-4"
            />
            <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded-lg w-full">
              Fetch Labeling
            </button>
          </form>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Labeling Information */}
          {labelingInfo && <ReadableLabeling labelingInfo={labelingInfo} />}
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Medications;
