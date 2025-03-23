import { useState } from "react";
import Form from "./components/form/Form";
import Header from "./components/header/Header";
import Report from "./components/report/Report";
import { Toaster } from "./components/ui/sonner";

function Predict() {
  const [loading, setLoading] = useState(true);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [reportData, setReportData] = useState();

  return (
    <div className="min-h-screen max-h-screen overflow-y-scroll overflow-x-hidden bg-radial from-white to-blue-100">
      <Toaster></Toaster>
      <Header></Header>

      <div className="max-w-[800px] mx-auto text-center glass">
        <h1 className="text-4xl font-bold">🩺 Predict Your Health Condition</h1>
        <p className="text-lg mt-3">
          Enter your details below to receive an AI-generated health analysis
          and suggested prescription. However, always consult a professional
          doctor for a confirmed diagnosis.
        </p>
      </div>

      {!loading && !reportGenerated && (
        <Form
          setLoading={setLoading}
          setReportData={setReportData}
          setReportGenerated={setReportGenerated}
        ></Form>
      )}

      {loading && <WarningAndLoading></WarningAndLoading>}

      {reportGenerated && <Report data={reportData}></Report>}
    </div>
  );
}

export default Predict;

function WarningAndLoading() {
  return (
    <div className="text-center mt-24 text-lg">
      <p>
        ⚠ This prediction is based on our small dataset and should not be taken
        as medical advice.
      </p>
      <p>Always seek professional medical attention for any health concerns.</p>
      <div className="lds-ellipsis text-[#1c4c5b] inline-block relative w-[80px] h-[80px]">
        <div className="absolute top-[33.33px] w-[13.33px] h-[13.33px] rounded-[50%] bg-current"></div>
        <div className="absolute top-[33.33px] w-[13.33px] h-[13.33px] rounded-[50%] bg-current"></div>
        <div className="absolute top-[33.33px] w-[13.33px] h-[13.33px] rounded-[50%] bg-current"></div>
        <div className="absolute top-[33.33px] w-[13.33px] h-[13.33px] rounded-[50%] bg-current"></div>
      </div>
    </div>
  );
}
