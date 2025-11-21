import sys
import json
import joblib
import numpy as np
import pandas as pd

def predict(data):
    model = joblib.load("../ai/modelo_pricecar.pkl")

    data = json.loads(data)

    X_input = pd.DataFrame([data], columns=model.feature_names_in_)

    prediction = model.predict(X_input)

    return prediction

data = sys.argv[1]
print(predict(data))
