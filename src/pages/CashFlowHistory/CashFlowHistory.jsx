import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../contexts/Firebase";
import { Spinner } from "../../components/Spinner/Spinner";

import { toast } from "react-toastify";
import "./CashFlowHistory.css"

export function CashFlowHistory() {

    const [userOn] = useAuthState(auth);

    const apiPagamentosRegistrados = import.meta.env.VITE_API_PAGAMENTOS;

    const [pagamentosRegistrados, setPagamentosRegistrados] = useState([]);
    
    const getPagamentosRegistrados = async () => {
        try {
            const res = await axios.get(apiPagamentosRegistrados);
            const listaPagamentosRegistrados = res.data.sort((a,b) => (a.data_pagamento < b.data_pagamento ? 1 : -1));
            setPagamentosRegistrados(listaPagamentosRegistrados.filter((lista) => lista.usuario===userOn.uid));
        } catch (error) {
            toast.error(error);
        }
    }

    useEffect(() => {
        getPagamentosRegistrados();
    }, [setPagamentosRegistrados]);

    return (
        <section className="secao__historico">
            <h2>Histórico Pagamentos</h2>
            <p>Abaixo consulte todos os pagamentos registrados</p>
            <table className="tabela__historico">
                <thead className="table__head">
                    <tr className="table__rows">
                        <th className="table__row">Nome</th>
                        <th className="table__row">Valor</th>
                        <th className="table__row">Data Pagamento</th>
                    </tr>
                </thead>
                <tbody className="table__body">
                    {pagamentosRegistrados.length > 0 && pagamentosRegistrados.map((pagamento) => 
                        <tr>
                            <td className="table__row">{pagamento.nome}</td>
                            <td className="table__row">R${(pagamento.valor_pagamento).toFixed(2)}</td>
                            <td className="table__row">{(pagamento.data_pagamento)}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    );
}