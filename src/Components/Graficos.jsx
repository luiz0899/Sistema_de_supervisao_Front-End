import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

export default function Chart({ fluxo }) {
  const [state, setState] = useState({
    series: [
      {
        name: "fluxostatoReading",
        data: []
      }
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Litros",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5
        }
      },
      xaxis: {
        categories: []
      }
    }
  });

  useEffect(() => { // faz o mapeamento dos itens recebidos e incere no grafico os 10 valores fornecido pela api
    const fluxostatoReadings = fluxo.map((item) => item.fluxostatoReading);

    setState((prevState) => ({
      ...prevState,
      series: [
        {
          ...prevState.series[0],
          data: fluxostatoReadings
        }
      ]
    }));
  }, [fluxo]);

  return (
    <div id="chart">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="line"
        height={300}
        width={700}
      />
    </div>
  );
}
