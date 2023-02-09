import { useState } from "react";
import { Chart } from "react-google-charts";
import { PayByRank } from "../PayByRank/PayByRank";

export function Dashboard({pagamentos, user}) {

    let entradas = 0;
    let despesas = 0;

    pagamentos.map((item) => {  
        if(item.tipo_pagamento==="Income" && item.usuario===user.uid) {
            entradas += item.valor_pagamento;
        } else if (item.tipo_pagamento==="Expense" && item.usuario===user.uid) {
            despesas += item.valor_pagamento;
        }
    })

    const [tabela, setTabela] = useState([
        ["Type", "Amount"],
        ["Incomes ($)",Math.round((entradas))],
        ["Expenses ($)",-Math.round((despesas))]
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
    
    return pagamentos.length > 0
    ?
    <article>
        <Chart chartType="Table" data={tabela} options={opcaoFormatoTabela} formatters={formatters}/>
        <PayByRank pagamentos={pagamentos}/>
    </article>
    :
    <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
}