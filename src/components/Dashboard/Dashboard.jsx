import { useState } from "react";
import { Chart } from "react-google-charts";
import { PayByRank } from "../PayByRank/PayByRank";

export function Dashboard({payments, user}) {

    let incomes = 0;
    let expenses = 0;

    payments.map((item) => {  
        if(item.type==="Income" && item.user===user.uid) {
            incomes += item.value;
        } else if (item.type==="Expense" && item.user===user.uid) {
            expenses += item.value;
        }
    })

    const [tabela, setTabela] = useState([
        ["Type", "Amount"],
        ["Incomes ($)",Math.round((incomes))],
        ["Expenses ($)",-Math.round((expenses))]
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
    
    return payments.length > 0
    ?
    <article>
        <Chart chartType="Table" data={tabela} options={opcaoFormatoTabela} formatters={formatters}/>
        <PayByRank payments={payments}/>
    </article>
    :
    <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
}