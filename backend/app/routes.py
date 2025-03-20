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
    
    print(data)
    print("\Final Description: ")
    print(user_text)

    returnArray = predict.make_prediction(user_text, user_symptoms)
    disease = returnArray[0].lower()
    diet = returnArray[1]

    with open("./model/disease_description.pkl", "rb") as f:
        disease_description_map = pickle.load(f)

    with open("./model/medication.pkl", "rb") as f:
        medication_map = pickle.load(f)

    with open("./model/precautions.pkl", "rb") as f:
        precautions_map = pickle.load(f)

    with open("./model/workout.pkl", "rb") as f:
        workout_map = pickle.load(f)

    # description = disease_description_map[disease]
    # medication = medication_map[disease]
    # precautions = precautions_map[disease]
    # workout = workout_map[disease]
    

    return jsonify({"disease":disease,"diet": diet})