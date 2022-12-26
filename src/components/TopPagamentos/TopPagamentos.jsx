import { auth } from "../../contexts/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export function TopPagamentos(pagamentos) {

    const [userOn] = useAuthState(auth);

    let listaDePagamentos = pagamentos.pagamentos;

    let listaDeEntradas = listaDePagamentos.filter((lista) => lista.tipo_pagamento==="Entrada" && lista.usuario===userOn.uid);
    let listaDeDespesas = listaDePagamentos.filter((lista) => lista.tipo_pagamento==="Despesa" && lista.usuario===userOn.uid);

    let topOneEntrada = listaDeEntradas[0];
    let topTwoEntrada = listaDeEntradas[1];
    let TopThreeEntrada = listaDeEntradas[2];
    let TopFourEntrada = listaDeEntradas[3];
    let TopFiveEntrada = listaDeEntradas[4];

    let topOneDespesa = listaDeDespesas[0];
    let topTwoDespesa = listaDeDespesas[1];
    let TopThreeDespesa = listaDeDespesas[2];
    let TopFourDespesa = listaDeDespesas[3];
    let TopFiveDespesa = listaDeDespesas[4];
    
    const TabelaTopPagamentos = () => {
        return listaDeEntradas!="" && listaDeDespesas!=""
        ?
        <article className="bloco__topPagamentos">
            <div className="div__categoria">
                <h3>Principais Entradas</h3>
                <table>
                    <thead>
                        <tr>
                            <th>N°</th>
                            <th>Nome</th>
                            <th>Valor</th>
                            <th>Descrição</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>{topOneEntrada.nome}</td>
                            <td>R${topOneEntrada.valor_pagamento}</td>
                            <td>{topOneEntrada.obs}</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>{topTwoEntrada.nome}</td>
                            <td>R${topTwoEntrada.valor_pagamento}</td>
                            <td>{topTwoEntrada.obs}</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>{TopThreeEntrada.nome}</td>
                            <td>R${TopThreeEntrada.valor_pagamento}</td>
                            <td>{TopThreeEntrada.obs}</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>{TopFourEntrada.nome}</td>
                            <td>R${TopFourEntrada.valor_pagamento}</td>
                            <td>{TopFourEntrada.obs}</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>{TopFiveEntrada.nome}</td>
                            <td>R${TopFiveEntrada.valor_pagamento}</td>
                            <td>{TopFiveEntrada.obs}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="div__categoria">
                <h3>Principais Despesas</h3>
                <table>
                    <thead>
                        <tr>
                            <th>N°</th>
                            <th>Nome</th>
                            <th>Valor</th>
                            <th>Descrição</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>{topOneDespesa.nome}</td>
                            <td>R${topOneDespesa.valor_pagamento}</td>
                            <td>{topOneDespesa.obs}</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>{topTwoDespesa.nome}</td>
                            <td>R${topTwoDespesa.valor_pagamento}</td>
                            <td>{topTwoDespesa.obs}</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>{TopThreeDespesa.nome}</td>
                            <td>R${TopThreeDespesa.valor_pagamento}</td>
                            <td>{TopThreeDespesa.obs}</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>{TopFourDespesa.nome}</td>
                            <td>R${TopFourDespesa.valor_pagamento}</td>
                            <td>{TopFourDespesa.obs}</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>{TopFiveDespesa.nome}</td>
                            <td>R${TopFiveDespesa.valor_pagamento}</td>
                            <td>{TopFiveDespesa.obs}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </article>
        :
        <article>
        </article>
    }

    return (
        <TabelaTopPagamentos />
    );
}