# 🚗 PriceCar - Predição de Preços de Veículos com IA

Uma aplicação Fullstack que utiliza Machine Learning para estimar o valor de mercado de veículos usados com base em dados históricos.

## 📸 Preview

<img width="494" height="625" alt="image" src="https://github.com/user-attachments/assets/495659d7-e7e0-4afe-82e2-d02d0389284f" />

## 📋 Sobre o Projeto

Este projeto foi desenvolvido para explorar a integração entre um backend em Node.js e scripts de Ciência de Dados em Python.

A aplicação recebe dados de um veículo (como ano, quilometragem, tipo de combustível, câmbio, etc.) através de um front-end moderno, processa essas informações em uma API e invoca um modelo de Machine Learning treinado (XGBoost) para retornar a previsão de preço em tempo real.

## 🚀 Tecnologias Utilizadas

*Data Science & Machine Learning* (Python)

Pandas & Numpy: Manipulação e análise de dados.

Scikit-Learn: Construção de Pipelines de pré-processamento (StandardScaler, OneHotEncoder).

XGBoost: Algoritmo de Gradient Boosting para regressão (modelo escolhido pela melhor performance).

Joblib: Serialização e persistência do modelo treinado (.pkl).

*Backend* (Node.js)

Express: Criação da API REST.

Python-Shell: Ponte de comunicação para execução de scripts Python via Node.js.

Cors: Gerenciamento de requisições.

*Frontend*

React / Next.js: Interface do usuário.

Tailwind CSS: Estilização responsiva.

Axios: Consumo da API.

##🧠 Como Funciona a IA

O modelo foi treinado utilizando um dataset de vendas de carros. O fluxo de predição segue os passos:

Entrada: O usuário envia os dados brutos (ex: "Petrol", "Manual", Ano 2015).

Pipeline: Os dados passam por um ColumnTransformer que normaliza valores numéricos e aplica One-Hot Encoding em variáveis categóricas.

Predição: O modelo XGBoost Regressor processa os dados tratados.

Conversão: O sistema ajusta a escala monetária (conversão de Lakhs para moeda local) e retorna o valor final.

## 🛠 Desafios e Aprendizados

Integração Inter-linguagens: O uso do python-shell permitiu manter o poder do ecossistema JS no back-end sem abrir mão das bibliotecas robustas de Data Science do Python.

Pipelines: A estruturação do treinamento em Pipelines do Scikit-Learn garantiu que o pré-processamento dos dados de entrada na API fosse idêntico ao dos dados de treino.


```markdown
![Preview do Projeto](./assets/preview.png)
