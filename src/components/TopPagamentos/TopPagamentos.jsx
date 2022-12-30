import { auth } from "../../contexts/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export function TopPagamentos(pagamentos) {

    const [userOn] = useAuthState(auth);

    const listaDePagamentos = pagamentos.pagamentos;

    const listaDePrincipaisPagamentos = (listaDePagamentos.filter((lista) => lista.usuario===userOn.uid)).slice(0,10);
    
    const TabelaTopPagamentos = () => {
        return listaDePrincipaisPagamentos.length > 0
        ?
        <article className="bloco__topPagamentos">
            <h3>Principais Registros de Pagamentos</h3>
            <table className="tabela__topPagamentos">
                <thead className="table__head">
                    <tr className="table__rows">
                        <th className="table__row">N°</th>
                        <th className="table__row">Tipo</th>
                        <th className="table__row">Valor</th>
                        <th className="table__row">Descrição</th>
                    </tr>
                </thead>
                <tbody className="table__body">
                    {listaDePrincipaisPagamentos.map((item,i) => 
                        <tr key={i} className="table__rows">
                            <td className="table__row">{i+1}</td>
                            <td className="table__row">{item.tipo_pagamento}</td>
                            <td className="table__row">R${item.valor_pagamento.toFixed(2)}</td>
                            <td className="table__row">{item.obs}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </article>
        :
        <p>Não há dados registrados!</p>
    }

    return (
        <TabelaTopPagamentos />
    );
}