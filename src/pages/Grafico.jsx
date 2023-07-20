import "../style/Grafico.css";
import Chart from "../Components/Graficos.jsx";
import { useState, useEffect } from "react";
import blogFetch from "../axios/config";


const Grafico = () => {
  
const [fluxo, setFluxo] = useState([]);

async function getFluxo() { // atualização da pagina
  try {
    const response = await blogFetch.get(`water_level`);
    const data = response.data;

    const ultimoNivel = data.slice(-10) ;

    setFluxo(ultimoNivel);

  
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {

  getFluxo();

  const interval = setInterval(() => {
    getFluxo();
  }, 30000);

  return () => clearInterval(interval);
}, []);

  return (
    <div className="grafico">
      
      <div className="grafico-consulmo">
        <h1> Consumo </h1>
         <Chart fluxo={fluxo} />
      </div>
      
    
    </div>
  );
};

export default Grafico;
