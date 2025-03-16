import { useEffect, useRef, useState } from "react";
import { predict } from "./api/prediction";

function App() {
  const [description, setDescription] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const [symptomFormOpen, setSymptomFormOpen] = useState(false);
  const [enteredSymptom, setEnteredSymptom] = useState("");
  const symptomInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [predictionResults, setPredictionResults] = useState({});

  const onAddClick = (e) => {
    setSymptomFormOpen(false);
    if (enteredSymptom.trim() !== "")
      setSymptoms([...symptoms, enteredSymptom]);
    setEnteredSymptom("");
  };

  const onAddSymptomClick = (e) => {
    setSymptomFormOpen(true);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    let response;

    setLoading(true);
    try {
      response = await predict(description, symptoms);
    } catch (error) {
      console.error("error in app.jsx from predict api");
    }
    setLoading(false);
    console.log(response);
    setPredictionResults(response.data);
  };

  useEffect(() => {
    if (symptomFormOpen) symptomInputRef.current?.focus();
  }, [symptomFormOpen]);

  return (
    <div>
      <form
        className="flex flex-col gap-7 p-4 w-[50%] mx-auto mt-20"
        onSubmit={onFormSubmit}
      >
        {/* <input type="text" placeholder="Enter blood group" className="border-2 h-10 p-2"/>
        <input type="number" placeholder="Enter age" min="10" max="100" className="border-2 h-10 p-2"/>
        <input type="number" placeholder="enter height" className="border-2 h-10 p-2"/>
        <input type="number" placeholder="enter weight" className="border-2 h-10 p-2"/> */}

        {symptoms.length !== 0 && <p>Added symptoms:</p>}

        <div className="flex gap-2">
          {symptoms.map((symptom) => (
            <span key={symptom}>{symptom},</span>
          ))}
        </div>

        <textarea
          placeholder="enter description of disease"
          className="border-2 h-32 p-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        {symptomFormOpen && (
          <>
            <label htmlFor="symptom_input">
              Enter symptom {symptoms.length + 1}
            </label>
            <div className="flex gap-5" onSubmit={onAddClick}>
              <input
                type="text"
                ref={symptomInputRef}
                id="symptom_input"
                placeholder="enter symptom here (in concise manner)"
                className="border-2 w-full h-10 p-2"
                value={enteredSymptom}
                onChange={(e) => setEnteredSymptom(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    onAddClick(e);
                  }
                }}
              />
              <button
                type="button"
                className="w-fit border-2 bg-green-400 p-2 cursor-pointer"
                onClick={onAddClick}
              >
                Add
              </button>
            </div>
          </>
        )}

        {!symptomFormOpen && (
          <button
            type="button"
            className="w-fit p-2 bg-orange-300 cursor-pointer border-2"
            onClick={() => setSymptomFormOpen(true)}
          >
            Add symptom +
          </button>
        )}

        <button
          type="submit"
          className="w-fit p-2 bg-green-300 border-2 cursor-pointer"
        >
          Submit
        </button>
      </form>

      {loading ? (
        <p className="text-center text-xl">Please wait loading.....</p>
      ) : null}

      {predictionResults.disease ? (
        <div className="text-center">
          <h1 className="font-bold text-2xl">
            You might have {predictionResults.disease}
          </h1>
          <p>{setPredictionResults.description}</p>
          <h2 className="text-xl mt-5 font-semibold">
            Somethings you should do...
          </h2>
          <ul className="flex flex-col text-left w-fit mx-auto border-2 mt-3">
            {predictionResults.precautions.map((precaution) => (
              <p>{precaution}</p>
            ))}
          </ul>

          <h2 className="text-xl mt-10 font-semibold">Workouts:</h2>
          <ul className="flex flex-col text-left w-fit mx-auto border-2 mt-3 mb-20">
            {predictionResults.workout.map((workout) => (
              <p>{workout}</p>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default App;
