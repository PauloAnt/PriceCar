import pandas as pd
import numpy as np

from sklearn.linear_model import LinearRegression
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.ensemble import RandomForestRegressor
from xgboost import XGBRegressor

from sklearn.model_selection import cross_val_score, KFold
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import mean_absolute_error, mean_squared_error, make_scorer


import joblib

dataset = pd.read_csv("car_prediction_data.csv")

X = dataset.drop("Selling_Price", axis=1)

y = dataset["Selling_Price"]

cv = KFold(n_splits=5, shuffle=True, random_state=42)

mae_scorer = make_scorer(mean_absolute_error, greater_is_better=False)
rmse_scorer = make_scorer(mean_squared_error, greater_is_better=False)


col_numeric = X.select_dtypes(include=["int64", "float64"]).columns
col_categoric = X.select_dtypes(include=["object"]).columns

preprocessing = ColumnTransformer(
    transformers=[
        ("num", StandardScaler(), col_numeric),
        ("cat", OneHotEncoder(handle_unknown="ignore"), col_categoric)
    ]
)

models = {
    "Regressão Linear": LinearRegression(), 
    "Regressão GradientBoost": GradientBoostingRegressor(), 
    "Regressão RandomForest": RandomForestRegressor(),
    "XGB Regressão": XGBRegressor(
        n_estimators=300,
        learning_rate=0.05,
        max_depth=6,
        subsample=0.8,
        colsample_bytree=0.8,
        random_state=42
    )}
print("-=-=-=-=-" * 10)
for nome, model in models.items():
    pipeline = Pipeline(steps=[
        ("preprocess", preprocessing),
        ("model", models[nome])
    ])

    mae_scores = cross_val_score(pipeline, X, y, scoring=mae_scorer, cv=cv)
    mae_scores = -mae_scores

    rmse_scores = cross_val_score(pipeline, X, y, scoring=rmse_scorer, cv=cv)
    rmse_scores = np.sqrt(-rmse_scores)  

    print(nome)
    print()
    print("Error Percentual:",  mae_scores.mean() / dataset["Selling_Price"].mean() * 100)
    print("MAE médio:", mae_scores.mean())
    print("RMSE médio:", rmse_scores.mean())
    print("-=-=-=-=-" * 10)

# pipeline = Pipeline(steps=[
#     ("preprocess", preprocessing),
#     ("model", models["XGBRegressor"])
# ])

# pipeline.fit(X, y)

# joblib.dump(pipeline, "modelo_pricecar.pkl")
# print("Modelo salvo com sucesso!")