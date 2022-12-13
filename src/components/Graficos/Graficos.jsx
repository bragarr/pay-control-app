import { useState } from "react";

import { Chart } from "react-google-charts";

export function Graficos({entradas, despesas}) {

    const [tabela, setTabela] = useState([
        ["Tipo", "Valores"],
        ["Entradas (R$)",Math.round((entradas))],
        ["Despesas (R$)",Math.round((-despesas))]
    ]);

    const opcaoFormato = {
        allowHtml: true,
        showRowNumber: true,
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

    return (
        <div className="area__graficos">
            <Chart
                chartType="Table"
                data={tabela}
                options={opcaoFormato}
                formatters={formatters}
                display="none"
            />
            <Chart 
                chartType="PieChart"
                data={pizza}
            />
        </div>
    );
};