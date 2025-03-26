import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";

const Report = ({ data }) => {
  const downloadImage = () => {
    const reportElement = document.getElementById("report");

    setTimeout(() => {
      html2canvas(reportElement, {
        scale: 2,
        backgroundColor: "white",
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        const pdf = new jsPDF("p", "mm", "a4");

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= 297;

        while (heightLeft > 0) {
          position -= 297;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= 297;
        }

        pdf.save("MedPred_Report.pdf");
        x;
      });
    }, 500);
  };

  const [bmiCondition, setBmiCondition] = useState("normal");

  useEffect(() => {
    if (!data) return;

    if (data.bmi < 18.5) setBmiCondition("underweight");
    else if (data.bmi < 25) setBmiCondition("normal");
    else if (data.bmi < 30) setBmiCondition("overweight");
    else setBmiCondition("obese");
  }, [data]);

  return (
    <div className="px-5 rounded-xl bg-white/15 shadow-2xl backdrop-blur-2xl shadow-gray-400 max-w-[850px] mx-auto mt-13 mb-20 border-red-400">
      <div id="google_translate_element"></div>
      <div id="report" className="px-3">
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
              <strong>Height:</strong> {data.height} cm
            </p>
            <p>
              <strong>Weight:</strong> {data.weight} kg
            </p>
            <p>
              <strong>BMI:</strong> {data.bmi.toFixed(2)}
            </p>
            <p>
              <strong>Blood Pressure:</strong> {data.blood_pressure} mmHg
            </p>
            <p>
              <strong>Cholesterol:</strong> {data.cholesterol} mg/dL
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

        <div className="bg-yellow-50 p-4 rounded-lg mb-4 border border-yellow-300">
          <h2 className="text-2xl font-semibold text-yellow-700">
            Precautions to avoid the disease in future
          </h2>
          <ul className="list-disc list-inside text-red-500">
            {data.precautions.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg mb-4 border border-purple-300">
          <h2 className="text-2xl font-semibold text-purple-700">
            Workout Plan
          </h2>
          <p className="text-purple-600">
            Your BMI is {data.bmi.toFixed(2)}. You fall in{" "}
            <strong>{bmiCondition}</strong> range. Below is a recommended
            workout plan for you.
          </p>
          <ul className="list-disc list-inside text-purple-600 mt-1">
            {data.workout.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="bg-rose-50 p-4 rounded-lg mb-4 border border-rose-300">
          <h2 className="text-2xl font-semibold text-rose-700">Medications</h2>
          <ul className="list-disc list-inside text-rose-600">
            {data.medication.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="bg-indigo-50 p-4 rounded-lg mb-4 border border-indigo-300">
          <h2 className="text-2xl font-semibold text-indigo-700">
            Recommended Diet
          </h2>
          <p className="text-gray-700 font-medium capitalize">
            Cuisine: <span className="text-blue-500">{data.cuisine}</span>
          </p>
          <p className="text-gray-800">
            You are recommended a {data.recommended}.
          </p>
          <div className="mt-2">
            <h3 className="font-semibold text-lg">Breakfast</h3>
            <p className="text-gray-600">{data.diets[0]}</p>
          </div>
          <div className="mt-2">
            <h3 className="font-semibold text-lg">Lunch</h3>
            <p className="text-gray-600">{data.diets[1]}</p>
          </div>
          <div className="mt-2">
            <h3 className="font-semibold text-lg">Dinner</h3>
            <p className="text-gray-600">{data.diets[2]}</p>
          </div>
        </div>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={downloadImage}
          className="px-6 mb-3 py-3 cursor-pointer text-white font-semibold rounded-lg shadow bg-blue-600 hover:bg-blue-700 transition duration-200"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default Report;
