export function TopPagamentos(pagamentos) {

    let listaDePagamentos = pagamentos.pagamentos;

    let listaDeEntradas = listaDePagamentos.filter((lista) => lista.tipo_pagamento==="Entrada");
    let listaDeDespesas = listaDePagamentos.filter((lista) => lista.tipo_pagamento==="Despesa");

    let topOneEntrada = listaDeEntradas[0].valor_pagamento;
    let topTwoEntrada = listaDeEntradas[1].valor_pagamento;
    let TopThreeEntrada = listaDeEntradas[2].valor_pagamento;
    let TopFourEntrada = listaDeEntradas[3].valor_pagamento;
    let TopFiveEntrada = listaDeEntradas[4].valor_pagamento;

    let topOneDespesa = listaDeDespesas[0].valor_pagamento;
    let topTwoDespesa = listaDeDespesas[1].valor_pagamento;
    let TopThreeDespesa = listaDeDespesas[2].valor_pagamento;
    let TopFourDespesa = listaDeDespesas[3].valor_pagamento;
    let TopFiveDespesa = listaDeDespesas[4].valor_pagamento;
    
    return (
        <article>
            <div>
                <h3>Principais Entradas</h3>
                <p>{topOneEntrada}</p>
                <p>{topTwoEntrada}</p>
                <p>{TopThreeEntrada}</p>
                <p>{TopFourEntrada}</p>
                <p>{TopFiveEntrada}</p>
            </div>
            <div>
                <h3>Principais Despesas</h3>
                <p>{topOneDespesa}</p>
                <p>{topTwoDespesa}</p>
                <p>{TopThreeDespesa}</p>
                <p>{TopFourDespesa}</p>
                <p>{TopFiveDespesa}</p>
            </div>
        </article>
    );
}