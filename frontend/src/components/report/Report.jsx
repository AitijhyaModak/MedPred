import React from "react";
import html2canvas from "html2canvas";

const Report = ({ data }) => {
  const downloadImage = () => {
    const reportElement = document.getElementById("report");

    html2canvas(reportElement, { scale: 2 }).then((canvas) => {
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "MedPred_Report.png";
      link.click();
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl border border-gray-300"
        id="report"
      >
        
        <div className="text-center py-4 mb-4 border-b-2 border-gray-300">
          <h1 className="text-4xl font-bold text-blue-600">MedPred Report</h1>
        </div>

        
        <div className="bg-blue-50 p-4 rounded-lg mb-4 border border-blue-300">
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">
            Personal Information
          </h2>
          <div className="grid grid-cols-2 gap-4 text-gray-700 text-lg">
            <p>
              <strong>Age:</strong> {data.age}
            </p>
            <p>
              <strong>Height:</strong> {data.height}
            </p>
            <p>
              <strong>Weight:</strong> {data.weight}
            </p>
            <p>
              <strong>BMI:</strong> {data.bmi}
            </p>
            <p>
              <strong>Blood Pressure:</strong> {data.blood_pressure}
            </p>
            <p>
              <strong>Cholesterol:</strong> {data.cholesterol}
            </p>
          </div>
        </div>

        
        <div className="bg-red-50 p-4 rounded-lg mb-4 border border-red-300">
          <h2 className="text-2xl font-semibold text-red-700 mb-2">
            Diagnosis
          </h2>
          <p className="text-lg">
            <strong>Disease:</strong> {data.disease_name}
          </p>
          <p className="text-gray-700">{data.description}</p>
        </div>

       
        <div className="bg-yellow-50 p-4 rounded-lg mb-4 border border-yellow-300">
          <h2 className="text-2xl font-semibold text-yellow-700">
            Things to Avoid
          </h2>
          <ul className="list-disc list-inside text-red-500">
            {data.precautions.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

       
        <div className="bg-green-50 p-4 rounded-lg mb-4 border border-green-300">
          <h2 className="text-2xl font-semibold text-green-700">
            Things to Do Now
          </h2>
          <ul className="list-disc list-inside text-green-600">
            {data.things_to_do_now.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        
        <div className="bg-purple-50 p-4 rounded-lg mb-4 border border-purple-300">
          <h2 className="text-2xl font-semibold text-purple-700">
            Workout Plan
          </h2>
          <ul className="list-disc list-inside text-purple-600">
            {data.workout.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        
        <div className="bg-indigo-50 p-4 rounded-lg mb-4 border border-indigo-300">
          <h2 className="text-2xl font-semibold text-indigo-700">
            Recommended Diet
          </h2>
          <p className="text-gray-700 font-medium">Cuisine: {data.cuisine}</p>
          <div className="mt-2">
            <h3 className="font-semibold text-lg">Breakfast</h3>
            <p className="text-gray-600">{data.diet[0]}</p>
          </div>
          <div className="mt-2">
            <h3 className="font-semibold text-lg">Lunch</h3>
            <p className="text-gray-600">{data.diet[1]}</p>
          </div>
          <div className="mt-2">
            <h3 className="font-semibold text-lg">Dinner</h3>
            <p className="text-gray-600">{data.diet[2]}</p>
          </div>
        </div>
      </div>
      <div className="text-center mt-6">
        <button
          onClick={downloadImage}
          className="px-6 py-3 text-white font-semibold rounded-lg shadow bg-blue-600 hover:bg-blue-700 transition duration-200"
        >
          Save as Image
        </button>
      </div>
    </div>
  );
};

export default Report;
