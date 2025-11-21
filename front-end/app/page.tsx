"use client"

import { useState } from "react";
import api from "../lib/axiosConfig"; // Certifique-se que a BaseURL é http://localhost:8080

export default function Home() {
  const [car_name, setCar_name] = useState("");
  const [year, setYear] = useState("");
  const [price_base, setPrice_base] = useState("");
  const [km_driven, setKm_driven] = useState("");
  const [owner, setOwner] = useState("");
  const [fuel_type, setFuel_type] = useState("");
  const [seller_type, setSeller_type] = useState("");
  const [transmission, setTransmission] = useState("");

  // Inicialize com null para sabermos quando NÃO tem resultado
  const [result, setResult] = useState(null);

  async function handlePredictSubmit(e) {
    e.preventDefault(); // Evita recarregar a página

    if (!year || !price_base || !km_driven || !owner || !fuel_type || !seller_type || !transmission) {
      alert("Por favor, preencha todos os campos antes de continuar.");
      return;
    }

    const payload = {
      "Car_Name": car_name,
      "Year": Number(year),
      // Divide por 100.000 aqui para bater com a lógica do modelo (Lakhs)
      "Present_Price": Number(price_base) / 100000, 
      "Kms_Driven": Number(km_driven),
      "Fuel_Type": fuel_type,
      "Seller_Type": seller_type,
      "Transmission": transmission,
      "Owner": Number(owner)
    };

    try {
        const resp = await api.post("/price", payload);
        
        console.log("Resposta completa do Back:", resp); // Olhe isso no F12 (Console)
        
        // Se o back retornar { status: 200, data: 14019.97 }
        // O axios coloca isso dentro de 'data'. 
        // Então o caminho é resp.data.data
        if (resp.data && resp.data.data) {
            setResult(resp.data.data); 
        } else {
            alert("O backend não retornou o valor esperado.");
        }

    } catch (err) {
        console.error(err);
        alert("Erro ao buscar previsão. Verifique se o servidor está rodando.");
    }
  }

  // Função para limpar todos os campos e o resultado
  function handleReset() {
    setCar_name("");
    setYear("");
    setPrice_base("");
    setKm_driven("");
    setOwner("");
    setFuel_type("");
    setSeller_type("");
    setTransmission("");
    setResult(null);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-400 px-4">
      <main className="w-full max-w-3xl bg-[#111] p-10 m-10 rounded-2xl flex flex-col items-center gap-6">
        
        <h1 className="text-4xl font-extrabold text-red-600">
          PriceCar
        </h1>

        <p className="text-gray-300 text-center max-w-md">
          Preencha as informações e veja o preço estimado do veículo
        </p>

        <form 
          className="w-full flex flex-col gap-4"
          onSubmit={handlePredictSubmit}
        >
          <input
            type="text"
            placeholder="Nome do carro (ex: civic)"
            value={car_name}
            onChange={(c) => setCar_name(c.target.value)}
            className="bg-[#1c1c1c] text-white border border-gray-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-600 outline-none shadow-inner"
          />

          <input
            type="number"
            placeholder="Ano do carro (ex: 2015)"
            value={year}
            onChange={(y) => setYear(y.target.value)}
            className="bg-[#1c1c1c] text-white border border-gray-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-600 outline-none shadow-inner"
          />

          <input
            type="number"
            placeholder="Preço FIPE/Zero KM (ex: 80000)"
            value={price_base}
            onChange={(p) => setPrice_base(p.target.value)}
            className="bg-[#1c1c1c] text-white border border-gray-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-600 outline-none shadow-inner"
          />

          <input
            type="number" 
            placeholder="Quilômetros rodados (ex: 50000)"
            value={km_driven}
            onChange={(k) => setKm_driven(k.target.value)}
            className="bg-[#1c1c1c] text-white border border-gray-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-600 outline-none shadow-inner"
          />

          <input
            type="number"
            placeholder="Donos anteriores (0, 1, 2...)"
            value={owner}
            onChange={(o) => setOwner(o.target.value)}
            className="bg-[#1c1c1c] text-white border border-gray-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-600 outline-none shadow-inner"
          />

          <select 
            className="cursor-pointer bg-[#1c1c1c] text-white border border-gray-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-600 outline-none"
            value={fuel_type}
            onChange={(f) => setFuel_type(f.target.value)}
          >
            <option value="" disabled>Tipo de Combustível</option>
            <option value="Petrol">Gasolina (Petrol)</option>
            <option value="Diesel">Diesel</option>
            <option value="CNG">GNV (CNG)</option>
          </select>

          <select 
            className="cursor-pointer bg-[#1c1c1c] text-white border border-gray-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-600 outline-none"
            value={seller_type}
            onChange={(s) => setSeller_type(s.target.value)}
          >
            <option value="" disabled>Tipo de Vendedor</option>
            <option value="Individual">Pessoa Física (Individual)</option>
            <option value="Dealer">Revendedora (Dealer)</option>
          </select>

          <select 
            className="cursor-pointer bg-[#1c1c1c] text-white border border-gray-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-600 outline-none"
            value={transmission}
            onChange={(t) => setTransmission(t.target.value)}
          >
            <option value="" disabled>Transmissão</option>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automático</option>
          </select>

          <div className="flex gap-3 mt-4">
            <button
                type="submit"
                className="flex-1 cursor-pointer bg-red-600 hover:bg-red-700 text-white font-bold tracking-wide px-6 py-3 rounded-lg transition shadow-md"
            >
                Ver Previsão
            </button>

            <button
                type="button"
                onClick={handleReset}
                className="cursor-pointer bg-gray-700 hover:bg-gray-600 text-white font-bold tracking-wide px-6 py-3 rounded-lg transition shadow-md"
            >
                Limpar
            </button>
          </div>
        </form>

        {/* Renderização Condicional: Só mostra se result não for null */}
        {result !== null && (
          <div className="mt-6 flex flex-col items-center justify-center w-full bg-[#1a1a1a] border border-red-500/40 px-10 py-6 rounded-xl shadow-lg animate-pulse">
            <p className="text-gray-300 text-sm uppercase tracking-wider">Valor estimado de venda:</p>
            <h1 className="text-4xl text-red-500 font-extrabold mt-2 drop-shadow-md">
              {/* Formata para R$ automaticamente */}
              {result.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </h1>
            
            <button 
                onClick={handleReset}
                className="mt-4 text-xs text-gray-400 hover:text-white underline cursor-pointer"
            >
                Fazer nova consulta
            </button>
          </div>
        )}
        
      </main>
    </div>
  );
}