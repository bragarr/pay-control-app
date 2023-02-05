import { Graficos } from "../Graficos/Graficos";
import { Spinner } from "../Spinner/Spinner";
import { PayByRank } from "../PayByRank/PayByRank";

export function Dashboard({pagamentos, user}) {

    let entradas = 0;
    let despesas = 0;

    pagamentos.map((item) => {  
        if(item.tipo_pagamento==="Entrada" && item.usuario===user.uid) {
            entradas += item.valor_pagamento;
        } else if (item.tipo_pagamento==="Despesa" && item.usuario===user.uid) {
            despesas += item.valor_pagamento;
        }
    })
    
    return pagamentos.length > 0
    ?
    <article className="posicao__grafica">
        <Graficos entradas={entradas} despesas={despesas}/>
        <PayByRank pagamentos={pagamentos}/>
    </article>
    :
    <Spinner />
}