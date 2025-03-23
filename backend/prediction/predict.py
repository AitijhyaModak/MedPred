from sentence_transformers import SentenceTransformer, util
import sentence_transformers
import mtranslate
import numpy as np
import pickle
import warnings
warnings.simplefilter('ignore')

with open("./model/symptoms.pkl", "rb") as f:
    symptom_columns = pickle.load(f)

def match_synonyms(user_text, model, indices, symptom_embeddings, threshold=0.7):
    user_embedding = model.encode(user_text)

    matched_symptoms = []
    for j in user_text.split(','):
        user_embedding = model.encode(j)
        for i, symptom in enumerate(symptom_columns):
            similarity = util.cos_sim(user_embedding, symptom_embeddings[i]).item()
            if similarity > threshold:
                matched_symptoms.append(symptom)
                indices.append(i)

    return matched_symptoms


def translate_text(text, target_lang="en"):
    return mtranslate.translate(text, target_lang)

def make_prediction(user_text, user_symptoms, user_data):

    user_text = translate_text(user_text, "en")

    with open("./model/disease_model.pkl", "rb") as f:
        sclf = pickle.load(f)

    model = SentenceTransformer('all-MiniLM-L6-v2')
    symptom_embeddings = model.encode(symptom_columns)

    indices = []
    vec = [0 for i in range(0, len(symptom_columns))]

    print(match_synonyms(user_text, model, indices, symptom_embeddings))
    for symptom in user_symptoms:
        print(match_synonyms(symptom, model, indices, symptom_embeddings))

    for i in indices:
        vec[i] = 1
    
    vec = np.array(vec).reshape(1, -1)
    a = sclf.predict(vec)
    a = a[0]

    user_data = np.array(user_data).reshape(1, -1)

    with open("./model/diet_model.pkl", "rb") as f:
        sclf2 = pickle.load(f)
        
    b = sclf2.predict(user_data)
    b = b[0]
    
    return [a, b]