import Form from "./components/form/Form";
import Header from "./components/header/Header";
import Report from "./components/report/Report";

const example_data = {
  age: "26",
  height: "180 cm",
  weight: "85 kg",
  caloric_intake: "2000 kcal",
  blood_pressure: "135 mmHg",
  cholesterol: "210 mg/dL",
  gender: "male",
  disease_name: "Hypertension",
  description:
    "Hypertension, or high blood pressure, is a condition where the force of the blood against artery walls is too high. It can lead to severe complications such as heart disease, stroke, and kidney failure if left untreated.",
  medication: [
    "ACE inhibitors (e.g., Lisinopril, Enalapril)",
    "Beta-blockers (e.g., Metoprolol, Atenolol)",
    "Calcium channel blockers (e.g., Amlodipine, Diltiazem)",
    "Diuretics (e.g., Hydrochlorothiazide, Chlorthalidone)",
    "Angiotensin II receptor blockers (e.g., Losartan, Valsartan)",
  ],
  precautions: [
    "Reduce sodium intake",
    "Exercise regularly",
    "Maintain a healthy weight",
    "Manage stress effectively",
    "Limit alcohol consumption",
    "Quit smoking",
  ],
  things_to_do_now: [
    "Check your blood pressure regularly",
    "Follow a low-sodium, heart-healthy diet",
    "Stay hydrated and avoid excessive caffeine",
    "Take prescribed medications as directed",
    "Consult a doctor if blood pressure remains high",
  ],
  bmi: "26.1",
  workout: [
    "Brisk walking (30-45 minutes)",
    "Cycling (moderate intensity, 30 minutes)",
    "Swimming (laps or water aerobics, 30-40 minutes)",
    "Bodyweight exercises (squats, lunges, push-ups, 3 sets of 10-15 reps)",
    "Strength training (light weights, full-body routine, 2-3 times per week)",
    "Jump rope (10-15 minutes with breaks)",
    "Yoga or Pilates (for flexibility and core strength)",
    "HIIT (low-impact variations like step-ups and modified burpees, 20-30 minutes)",
  ],
  recommended: "low sodium diet",
  cuisine: "indian",
  diet: [
    "Oats upma cooked with finely chopped carrots, beans, and bell peppers, tempered with cumin and mustard seeds, and served with a side of unsalted coconut chutney.",
    "Brown rice with moong dal (cooked without added salt) seasoned with turmeric, cumin, and coriander, accompanied by a side of sautéed spinach with garlic and a bowl of plain curd.",
    "Quinoa khichdi made with yellow lentils, diced zucchini, and tomatoes, flavored with ginger, black pepper, and a dash of lemon juice, served with cucumber raita made from unsalted curd and fresh coriander.",
  ],
};

function App() {
  return (
    <div className="min-h-screen max-h-screen overflow-y-scroll overflow-x-hidden pt-2 bg-radial from-white to-blue-100">
      <Header></Header>
    </div>
  );
}

export default App;
