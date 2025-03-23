from flask import Blueprint, request, jsonify #type: ignore
import pickle
from prediction import predict
import warnings
warnings.simplefilter('ignore')

main_blueprint = Blueprint("main", __name__)

@main_blueprint.route("/")
def home():
    return jsonify({"message":"Medical Recommendation System API"})


@main_blueprint.route("/predict", methods=["POST"])
def disease_prediction():
    data = request.json

    user_symptoms = data.get("symptoms",[])
    user_text = data.get("problemDescription", "")
    bmi = float(data.get("bmi",25))
    age = data.get("age")
    height = data.get("height")
    weight = data.get("weight")
    caloricIntake = data.get("dailyCaloricIntake")
    cholesterol = data.get("cholesterol")
    bloodPressure = data.get("bloodPressure")
    physicalActivity = data.get("sedentary")
    gender = data.get("gender")
    cuisine = data.get("cuisine")

    if (physicalActivity=="sedentary"): physicalActivityN = 0
    elif (physicalActivity=="moderate"): physicalActivityN = 1
    else: physicalActivityN = 2

    if (gender=="male"): genderN = 0
    else : genderN = 1

    if (cuisine=="mexican"): cuisineN = 0
    elif (cuisine=="chinese"): cuisineN = 1
    elif (cuisine=="italian"): cuisineN = 2
    else: cuisineN = 3

    print("Bmi is %d" % bmi)
    print("Cuisine is %d" % cuisineN)
    print("Physical Activity is %d" % physicalActivityN)
    print("Gender is %d" % genderN)
    
    print(data)

    print("\Final Description: ")
    print(user_text)

    user_data = [age, genderN, weight, height, bmi, physicalActivityN, caloricIntake, cholesterol, bloodPressure, cuisineN]

    returnArray = predict.make_prediction(user_text, user_symptoms, user_data)
    disease_index = returnArray[0]
    diet_index = returnArray[1]
    print(disease_index)
    print(diet_index)

    with open("./model/disease_dictionary.pkl", "rb") as f:
        disease_dictionary = pickle.load(f)

    with open("./model/workout.pkl", "rb") as f:
        workout_data = pickle.load(f)

    with open("./model/diet_plan.pkl", "rb") as f:
        diet_data = pickle.load(f)

    disease_data = disease_dictionary[disease_index]
    
    if (bmi < 18.5): workout = workout_data[0]
    elif (bmi < 25): workout = workout_data[1]
    else: workout = workout_data[2]

    return jsonify({
        "age": age,
        "height": height, 
        "caloric_intake": caloricIntake,
        "blood_pressure": bloodPressure,
        "cholesterol": cholesterol,
        "weight": weight,
        "gender": gender,
        "disease_name": disease_data["disease_name"],
        "description": disease_data["description"],
        "medication": disease_data["medication"],
        "precautions": disease_data["precautions"],
        "things_to_do_now": disease_data["things_to_do_now"],
        "bmi": bmi,
        "workout": workout,
        "recommended": diet_data[diet_index][data.get("cuisine")]["recommended"],
        "cuisine": cuisine,
        "diets": diet_data[diet_index][data.get("cuisine")]["diet"]
    })