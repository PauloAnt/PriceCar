import express from "express";
import http from "http-status";
import cors from "cors";

import {PythonShell} from "python-shell";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/status", (req, res) => {
    res.json({
        status: http.OK,
        message: "Servidor funcionando com sucesso!"
    })
})

app.post("/price", (req, res) => {
    const data = req.body;
    console.log(data);
    PythonShell.run(
        "src/predict.py",
        {
            mode: "text",         
            args: [JSON.stringify(data)]
        }
    ).then(messages => {
        try {
            const parsed = JSON.parse(messages[messages.length - 1]);
            const valorCalculado = parsed[0] * 100000;
            const valorFinal = parseFloat(valorCalculado.toFixed(2));
            
            console.log("Objeto parseado:", valorFinal);

            res.json({
                status: 200,
                data: valorFinal
            });
        } catch (e) {
            console.error("Erro ao parsear JSON do Python:", e);
            res.status(500).json({ status: "error", message: "Erro ao parsear resposta do Python" });
        }
    }).catch(err => {
        console.error("Erro ao rodar PythonShell:", err);
        res.status(500).json({ status: "error", message: err.message });
    });
});

app.listen(8080, () =>{
    console.log("Servidor rodando: http://localhost:8080")
})