from sentence_transformers import SentenceTransformer, util
import sentence_transformers
import spacy
import mtranslate
import mlxtend
import numpy as np
import pickle

with open("./model/symptoms.pkl", "rb") as f:
    symptom_columns = pickle.load(f)

def match_synonyms(symptoms,symptom_embeddings,model,  threshold=0.7):
    indices = []

    matched_symptoms = []
    for j in symptoms:
        user_embedding = model.encode(j)
        for i, symptom in enumerate(symptom_columns):
            similarity = util.cos_sim(user_embedding, symptom_embeddings[i]).item()
            if similarity > threshold:
                matched_symptoms.append(symptom)
                indices.append(i)
    print("matched: \n")
    print(matched_symptoms)
    return indices


def translate_text(text, target_lang="en"):
    return mtranslate.translate(text, target_lang)

def make_prediction(user_text, user_symptoms):

    user_text = translate_text(user_text, "en")
    nlp = spacy.load("en_core_sci_md")
    doc = nlp(user_text)
    extracted_symptoms = [ent.text for ent in doc.ents if ent.label_ == "DISEASE"]

    with open("./model/disease_model.pkl", "rb") as f:
        sclf = pickle.load(f)

    model = SentenceTransformer('all-MiniLM-L6-v2')
    symptom_embeddings = model.encode(symptom_columns)

    user_text = translate_text(user_text, "en")
    doc = nlp(user_text)
    extracted_symptoms = [ent.text for ent in doc.ents]
    
    for i in extracted_symptoms:
        user_symptoms.append(i)

    print(user_symptoms)

    indices = match_synonyms(user_symptoms,symptom_embeddings, model)
    vec = [0 for i in range(0, len(symptom_columns))]

    for j in indices:
        vec[j] = 1
    
    vec = np.array(vec).reshape(1, -1)
    a = sclf.predict(vec)
    a = a[0]

    with open("./model/mapping.pkl", "rb") as f:
        mapping = pickle.load(f)
    
    return mapping[a]