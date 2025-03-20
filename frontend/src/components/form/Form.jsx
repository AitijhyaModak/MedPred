import { useEffect, useRef, useState } from "react";
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
  bmi: "",
  problemDescription: "",
  symptoms: [],
};

function Form() {
  const [enteredSymptom, setEnteredSymptom] = useState("");
  const [userDetails, setUserDetails] = useState(defaultUserDetails);

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

  const onFormSubmit = async (e) => {
    e.preventDefault();
    let response;
    //add validation
    // setLoading(true);
    try {
      response = await predict(userDetails);
    } catch (error) {
      console.error("error in app.jsx from predict api");
    }
    // setLoading(false);
    console.log(response);
  };

  return (
    <form
      className="bg-card rounded-xl pt-4 pb-4 w-[50%] mx-4 mt-8"
      onSubmit={onFormSubmit}
    >
      <h1 className="text-3xl text-red-200 mb-5 mx-6 pb-5 border-amber-800">
        Enter your details
      </h1>

      <div className="flex flex-col gap-8 px-6 max-h-[540px] overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-primary scrollbar-track-card">
        <div className="flex justify-between gap-10">
          <div className="flex flex-col gap-2 w-full">
            <span className="text-red-100 text-sm ml-[1px]">Age</span>
            <Input
              className="cursor-pointer text-red-100 focus-visible:ring-primary border-primary"
              type="number"
              placeholder="Age"
              min="5"
              max="100"
              value={userDetails.age}
              onChange={(e) =>
                setUserDetails({ ...userDetails, age: Number(e.target.value) })
              }
            ></Input>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <span className="text-red-100 text-sm ml-[1px]">Height</span>
            <Input
              className="cursor-pointer text-red-100 focus-visible:ring-primary border-primary"
              type="number"
              placeholder="Height (cm)"
              min="50"
              max="300"
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
            <span className="text-red-100 text-sm ml-[1px]">Weight</span>
            <Input
              className="cursor-pointer text-red-100 focus-visible:ring-primary border-primary"
              type="number"
              placeholder="Weight (kg)"
              min="10"
              max="150"
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
            <span className="text-red-100 text-sm ml-[1px]">
              Daily Caloric Intake
            </span>
            <Input
              className="cursor-pointer text-red-100 focus-visible:ring-primary border-primary"
              type="number"
              placeholder="Caloric Intake (kcal)"
              min="300"
              max="11000"
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
            <span className="text-red-100 text-sm ml-[1px]">
              Blood Pressure (mmHg)
            </span>
            <Input
              className="cursor-pointer text-red-100 focus-visible:ring-primary border-primary"
              type="number"
              min="20"
              max="300"
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
            <span className="text-red-100 text-sm ml-[1px]">
              Cholesterol (mg/dL)
            </span>
            <Input
              className="cursor-pointer text-red-100 focus-visible:ring-primary border-primary"
              type="number"
              placeholder="Cholesterol (mg/dL)"
              min="20"
              max="500"
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
            <span className="text-red-100 text-sm ml-[1px]">
              Physical Activity
            </span>
            <Select
              className="cursor-pointer"
              value={userDetails.physicalActivity}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  physicalActivity: e.target.value,
                })
              }
            >
              <SelectTrigger className="w-full text-red-100 rounded-lg border-primary">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">Sedentary</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="active">Active</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <span className="text-red-100 text-sm ml-[1px]">Gender</span>
            <Select
              className="cursor-pointer"
              value={userDetails.gender}
              onChange={(e) =>
                setUserDetails({ ...userDetails, gender: e.target.value })
              }
            >
              <SelectTrigger className="w-full text-red-100 rounded-lg border-primary">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <span className="text-red-100 text-sm ml-[1px]">Cuisine</span>
            <Select
              className="cursor-pointer"
              value={userDetails.cuisine}
              onChange={(e) =>
                setUserDetails({ ...userDetails, cuisine: e.target.value })
              }
            >
              <SelectTrigger className="w-full text-red-100 rounded-lg border-primary">
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
          <span className="text-red-100 text-sm ml-[1px]">
            Describe your problem
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
            className="border-primary h-24 focus-visible:ring-primary text-red-100 text-base"
          ></Textarea>
        </div>

        {userDetails.symptoms.length !== 0 && (
          <div className="flex gap-5 flex-wrap">
            {userDetails.symptoms.map((symptom) => (
              <SymptomTag
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
              <button className="cursor-pointer bg-gray-300 h-10 w-fit px-5 rounded-lg hover:opacity-90 hover:scale-[1.05] transition-all duration-150">
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
          <button className="bg-primary mb-3 cursor-pointer h-10 w-fit px-5 rounded-lg hover:opacity-90 hover:scale-[1.05] transition-all duration-150">
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
    <div className="items-center flex text-red-200 px-4 border-2 rounded-xl py-1 border-primary gap-5 w-fit">
      <span className="">{symptom}</span>
      <button
        type="button"
        onClick={onCrossClick}
        className="cursor-pointer text-xl text-primary font-semibold"
      >
        x
      </button>
    </div>
  );
}
