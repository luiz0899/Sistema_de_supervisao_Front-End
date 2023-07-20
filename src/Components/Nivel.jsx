import React, { useState } from "react";
import "../style/Nivel.css";


export default function Nivel ({nivel}) { // faz o calculo do valor recebido para o recipiente.

    const qdtNiv = 300 - (nivel / 20) * 300;
    const  qdtNiv2 = 300 - (nivel / 20) * 300;

  return (

    <div className="nivel">

        <div className="qtdNivel" style={{ height: qdtNiv2 }}>
            <h1> {qdtNiv} Ml </h1>
        </div>
     
    </div>
  );
}
