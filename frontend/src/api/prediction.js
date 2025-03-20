import axios from "axios"

export const predict = async (userDetails) => {
    let response;
    try {
        response = await axios.post("http://localhost:5000/predict", {
           symptoms: userDetails.symptoms,
           problemDescription: userDetails.problemDescription,
           age:userDetails.age,
           height:userDetails.height,
           weight:userDetails.weight,
           dailyCaloricIntake:userDetails.dailyCaloricIntake,
           bloodPressure:userDetails.bloodPressure,
           cholesterol:userDetails.cholesterol,
           physicalActivity:userDetails.physicalActivity,
           gender:userDetails.gender,
           cuisine:userDetails.cuisine,
        })
    }
    catch (error) {
        console.error("Error sending data in predict");
    }

    return response
}