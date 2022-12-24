import { Graficos } from "../Graficos/Graficos";
import { Spinner } from "../Spinner/Spinner";
import { TopPagamentos } from "../TopPagamentos/TopPagamentos";

export function InformacoesGeraisUsuario({pagamentos, user}) {

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
        <div className="resumo__saldo">
            <h3 className="dados__saldo">Balanço Total<br/>(Entrada - Despesas)</h3>
            <p className="dados__saldo">R${((entradas)-(despesas)).toFixed(2)}</p>
        </div>
        <Graficos entradas={entradas} despesas={despesas}/>
        <div>
            <TopPagamentos pagamentos={pagamentos}/>
        </div>
    </article>
    :
    <Spinner />
}