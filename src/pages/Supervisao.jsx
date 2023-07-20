
import Nivel from "../Components/Nivel";
import blogFetch from "../axios/config";
import "../style/Supervisao.css";
import { useState, useEffect } from "react";


const Supervizao = () => {

  const [nivel, setNivel] = useState(0);

  async function getNivel() { // Recebe o valor da api .
    try {
      const response = await blogFetch.get(`water_level`);
      const data = response.data;

      const ultimoNivel = data[data.length - 1].waterLevelReading;
      setNivel(ultimoNivel);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {

    getNivel();

    const interval = setInterval(() => {
      getNivel();
    }, 10000);

    return () => clearInterval(interval);
  }, []);


  return (// aqui me retorna os conteudos da api "id" ,"title" , "body" 
    <div className="supervizao">

      <div className="fundoSup">

        <h1 className="supH1"> Supervisão </h1>

        <Nivel nivel={nivel} />


        <h2 className="supH2">Nivel Reservatório</h2>
      </div>



    </div>
  );

};

export default Supervizao;