import axios from "axios"

export const predict = async (user_text, user_symptoms) => {
    let response;
    try {
        response = await axios.post("http://localhost:5000/predict", {
            user_text, user_symptoms
        })
    }
    catch (error) {
        console.error("Error sending data in predict");
    }

    return response
}