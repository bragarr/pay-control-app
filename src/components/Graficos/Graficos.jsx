import { useState } from "react";

import { Chart } from "react-google-charts";


export function Graficos({entradas, despesas}) {

    const [tabela, setTabela] = useState([
        ["Tipo", "Valores"],
        ["Entradas (R$)",Math.round((entradas))],
        ["Despesas (R$)",Math.round((-despesas))]
    ]);

    const opcaoFormatoTabela = {
        allowHtml: true,
    };

    const formatters = [
        {
          type: "BarFormat",
          column: 1,
          options: {
            width: 120,
          },
        },
    ];

    const [pizza, setPizza] = useState([
        ["Entradas", "Despesas"],
        ["Entradas", (entradas)],
        ["Despesas", (despesas)]
    ]);

    const opcaoFormatoGraficoPizza = {
        width:"350px"
    }

    return (
        <div
            style={{
                zIndex: -1,
                textAlign: "center",
            }}
        >
            <Chart
                chartType="Table"
                data={tabela}
                options={opcaoFormatoTabela}
                formatters={formatters}
            />
            <Chart 
                chartType="PieChart"
                data={pizza}
                options={opcaoFormatoGraficoPizza}
            />
        </div>
    );
};