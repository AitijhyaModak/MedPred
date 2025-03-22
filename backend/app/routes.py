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
    bmi = data.get("bmi",25)
    print(bmi)
    
    print(data)
    print("\Final Description: ")
    print(user_text)

    returnArray = predict.make_prediction(user_text, user_symptoms)
    disease_index = returnArray[0]
    diet_index = returnArray[1]

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
        "age":data.get("age"),
        "height":data.get("height"),
        "caloric_intake": data.get("dailyCaloricIntake"),
        "blood_pressure": data.get("bloodPressure"),
        "cholesterol": data.get("cholesterol"),
        "gender": data.get("gender"),
        "disease_name": disease_data["disease_name"],
        "description": disease_data["description"],
        "medication": disease_data["medication"],
        "precautions": disease_data["precautions"],
        "things_to_do_now": disease_data["things_to_do_now"],
        "bmi": bmi,
        "workout": workout,
        "recommended": diet_data[diet_index][data.get("cuisine")]["recommended"],
        "cuisine": data.get("cuisine"),
        "diets": diet_data[diet_index][data.get("cuisine")]["diet"]
    })