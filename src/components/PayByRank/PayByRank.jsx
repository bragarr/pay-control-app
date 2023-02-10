import { auth } from "../../contexts/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export function PayByRank(pagamentos) {

    const [userOn] = useAuthState(auth);

    const listaDePagamentos = pagamentos.pagamentos;

    const listaDePrincipaisPagamentos = (listaDePagamentos.filter((lista) => lista.usuario===userOn.uid)).slice(0,10);
    
    const TabelaTopPagamentos = () => {
        return listaDePrincipaisPagamentos.length > 0
        ?
        <section>
            <h3>Ranked Incomes/Expenses</h3>
            <table className="table table-sm" width="300px">
                <thead className="table-dark">
                    <tr>
                        <th>N°</th>
                        <th>Type</th>
                        <th>Value</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {listaDePrincipaisPagamentos.map((item,i) => 
                        <tr key={i}>
                            <td>{i+1}</td>
                            <td>{item.tipo_pagamento}</td>
                            <td>${item.valor_pagamento.toFixed(2)}</td>
                            <td>{item.obs}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
        :
        <p>Não há dados registrados!</p>
    }

    return (
        <TabelaTopPagamentos />
    );
}