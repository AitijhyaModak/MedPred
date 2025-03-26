import { useState } from "react";
import { predict } from "../../api/prediction";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const defaultUserDetails = {
  age: "",
  height: "",
  weight: "",
  dailyCaloricIntake: 1600,
  bloodPressure: 120,
  cholesterol: 180,
  physicalActivity: "moderate",
  gender: "male",
  cuisine: "indian",
  problemDescription: "",
  symptoms: [],
};

const initialError = {
  age: true,
  weight: true,
  height: true,
  symptoms: true,
};

function Form({
  setLoading,
  setReportData,
  setReportGenerated,
  setPredictError,
}) {
  const [enteredSymptom, setEnteredSymptom] = useState("");
  const [userDetails, setUserDetails] = useState(defaultUserDetails);
  const [error, setError] = useState(initialError);
  const [disabled, setDisabled] = useState(false);

  const onAddClick = (e) => {
    if (enteredSymptom.trim() !== "")
      setUserDetails({
        ...userDetails,
        symptoms: [
          ...userDetails.symptoms,
          enteredSymptom.toLowerCase().trim(),
        ],
      });
    setEnteredSymptom("");
  };

  const checkFormEmpty = (userDetails) => {
    let weight = true;
    let age = true;
    let height = true;
    let symptoms = true;

    if (!userDetails.weight) weight = false;
    if (!userDetails.age) age = false;
    if (!userDetails.height) height = false;
    if (!userDetails.problemDescription.trim() && !userDetails.symptoms.length)
      symptoms = false;

    setError({ weight, age, height, symptoms });
    return weight && age && height && symptoms;
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    let response;

    if (!checkFormEmpty(userDetails)) {
      toast("", {
        className: "!shadow-2xl !bg-red-50 !border-2 !border-red-500",
        description: <FormError></FormError>,
      });
      return;
    }

    const heightSquare = (userDetails.height / 100) ^ 2;
    const calculatedBmi = userDetails.weight / heightSquare;
    const newUserDetails = { ...userDetails, bmi: calculatedBmi };
    console.log(calculatedBmi);
    setUserDetails(newUserDetails);
    console.log(userDetails);

    setLoading(true);

    try {
      response = await predict(newUserDetails);
    } catch (error) {
      console.error("error in app.jsx from predict api");
    } finally {
      setLoading(false);
    }

    if (!response) {
      setPredictError(true);
      console.log("Dfas");
      return;
    }

    setReportData(response.data);
    setReportGenerated(true);
    console.log(response);
  };

  return (
    <form className="max-w-[900px] mt-10 mx-auto glass" onSubmit={onFormSubmit}>
      <div className="flex flex-col gap-8 px-6">
        <div className="flex justify-between gap-10">
          <div className="flex flex-col gap-2 w-full">
            <span
              className={`input-label ${!error.age ? "input-label-error" : ""}`}
            >
              Age
            </span>
            <Input
              className={`input-box ${!error.age ? "input-error" : ""}`}
              type="number"
              placeholder="Age"
              value={userDetails.age}
              onChange={(e) =>
                setUserDetails({ ...userDetails, age: Number(e.target.value) })
              }
            ></Input>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <span
              className={`input-label ${
                !error.height ? "input-label-error" : ""
              }`}
            >
              Height (cm)
            </span>
            <Input
              className={`input-box ${!error.height ? "input-error" : ""}`}
              type="number"
              placeholder="Height"
              value={userDetails.height}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  height: Number(e.target.value),
                })
              }
            ></Input>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <span
              className={`input-label ${
                !error.weight ? "input-label-error" : ""
              }`}
            >
              Weight (kg)
            </span>
            <Input
              className={`input-box ${!error.weight ? "input-error" : ""}`}
              type="number"
              placeholder="Weight"
              value={userDetails.weight}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  weight: Number(e.target.value),
                })
              }
            ></Input>
          </div>
        </div>

        <div className="flex justify-between gap-10">
          <div className="flex flex-col gap-2 w-full">
            <span className="input-label">Daily Caloric Intake</span>
            <Input
              className="input-box"
              type="number"
              placeholder="Caloric Intake (kcal)"
              value={userDetails.dailyCaloricIntake}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  dailyCaloricIntake: Number(e.target.value),
                })
              }
            ></Input>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <span className="input-label">Blood Pressure (mmHg)</span>
            <Input
              className="input-box"
              type="number"
              placeholder="Blood Pressure (mmHg)"
              value={userDetails.bloodPressure}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  bloodPressure: Number(e.target.value),
                })
              }
            ></Input>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <span className="input-label">Cholesterol (mg/dL)</span>
            <Input
              className="input-box"
              type="number"
              placeholder="Cholesterol (mg/dL)"
              value={userDetails.cholesterol}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  cholesterol: Number(e.target.value),
                })
              }
            ></Input>
          </div>
        </div>

        <div className="flex justify-between gap-10">
          <div className="flex flex-col gap-2 w-full">
            <span className="input-label">Physical Activity</span>
            <Select
              className="cursor-pointer"
              value={userDetails.physicalActivity}
              onValueChange={(newValue) =>
                setUserDetails({ ...userDetails, physicalActivity: newValue })
              }
            >
              <SelectTrigger className="input-box w-full">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent className="bg-blue-100 text-black cursor-pointer">
                <SelectItem value="sedentary">Sedentary</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="active">Active</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <span className="input-label">Gender</span>
            <Select
              className="cursor-pointer"
              value={userDetails.gender}
              onValueChange={(newValue) =>
                setUserDetails({ ...userDetails, gender: newValue })
              }
            >
              <SelectTrigger className="w-full input-box">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <span className="input-label">Cuisine</span>
            <Select
              className="cursor-pointer"
              value={userDetails.cuisine}
              onValueChange={(newValue) =>
                setUserDetails({ ...userDetails, cuisine: newValue })
              }
            >
              <SelectTrigger className="w-full input-box">
                <SelectValue placeholder="Cuisine" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="indian">Indian</SelectItem>
                <SelectItem value="italian">Italian</SelectItem>
                <SelectItem value="chinese">Chinese</SelectItem>
                <SelectItem value="mexican">Mexican</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span
            className={`input-label ${
              !error.symptoms ? "input-label-error" : ""
            }`}
          >
            Describe your problem (Write only symptoms for best results)
          </span>

          <Textarea
            placeholder="Start writing or speaking..."
            value={userDetails.problemDescription}
            onChange={(e) =>
              setUserDetails({
                ...userDetails,
                problemDescription: e.target.value,
              })
            }
            className={`input-box h-20 ${!error.symptoms ? "input-error" : ""}`}
          ></Textarea>
        </div>

        {userDetails.symptoms.length !== 0 && (
          <div className="flex gap-5 flex-wrap">
            {userDetails.symptoms.map((symptom, index) => (
              <SymptomTag
                key={index}
                symptom={symptom}
                userDetails={userDetails}
                setUserDetails={setUserDetails}
              ></SymptomTag>
            ))}
          </div>
        )}

        <div className="flex gap-6">
          <Dialog>
            <DialogTrigger asChild>
              <button
                disabled={disabled}
                className="disabled:cursor-not-allowed cursor-pointer bg-blue-200 h-10 w-fit px-5 rounded-lg hover:opacity-90 hover:scale-[1.05] transition-all duration-150"
              >
                Add Symptoms +
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-slate-950 text-primary border-primary">
              <DialogHeader>
                <DialogTitle className="text-2xl text-primary">
                  Add Symptom
                </DialogTitle>
              </DialogHeader>
              <div className="text-white mt-2 flex flex-col">
                <p>
                  Write your symptom one by one, in concise manner{" "}
                  {"(eg. Headache, Knee pain, etc)"}
                </p>
                <Input
                  type="text"
                  value={enteredSymptom}
                  onChange={(e) => setEnteredSymptom(e.target.value)}
                  className="mt-6 border-primary h-10 focus-visible:ring-primary focus:border-none text-red-100"
                  placeholder="Write your symptom"
                ></Input>
                <button
                  onClick={onAddClick}
                  className="cursor-pointer hover:opacity-90 hover:scale-[1.05] transition-all duration-150 bg-primary w-fit px-5 rounded-lg mt-6 h-10 self-end"
                >
                  Add
                </button>
              </div>
            </DialogContent>
          </Dialog>
          <button
            disabled={disabled}
            className="disabled:cursor-not-allowed bg-primary mb-3 text-white cursor-pointer h-10 w-fit px-5 rounded-lg hover:opacity-90 hover:scale-[1.05] transition-all duration-150"
          >
            Generate Report
          </button>
        </div>
      </div>
    </form>
  );
}

export default Form;

function SymptomTag({ symptom, userDetails, setUserDetails }) {
  const onCrossClick = () => {
    const symptomsAfterDeletion = userDetails.symptoms.filter(
      (symp) => symp !== symptom
    );
    setUserDetails({ ...userDetails, symptoms: symptomsAfterDeletion });
  };

  return (
    <div className="items-center flex text-blue-800 font-semibold px-4 border-2 rounded-xl py-1 border-primary gap-5 w-fit">
      <span className="">{symptom}</span>
      <button
        type="button"
        onClick={onCrossClick}
        className="cursor-pointer text-xl text-red-400 font-semibold"
      >
        x
      </button>
    </div>
  );
}

function FormError() {
  return (
    <div className="text-red-500 text-base">
      <p>Please fill up all the fields to proceed.</p>
    </div>
  );
}
