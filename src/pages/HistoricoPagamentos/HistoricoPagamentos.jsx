import { useState, useEffect } from "react";

import { Spinner } from "../../components/Spinner/Spinner";

import axios from "axios";


export function HistoricoPagamentos() {

    const [cadastrados, setCadastrados] = useState([]);
    const [onEdit, setOnEdit] = useState(null);

    const getcadastrados = async () => {
        try {
            const res = await axios.get("https://controle-pagamentos-backend.herokuapp.com/pagamentos");
            setCadastrados(res.data.sort((a,b) => (a.name > b.name ? 1 : -1)));
        } catch (error) {
            toast.error(error);
        }
    };

    useEffect(() => {
        getcadastrados();
    }, [setCadastrados]);

    const CarregamentoDeDados = () => {
        return cadastrados.length <= 0
        ?
        <Spinner />
        :
        <section>
            <h2>Histórico de Pagamentos</h2>
            <table>
                <thead>
                    <tr>
                        <th>Tipo Pagamento</th>
                        <th>Nome</th>
                        <th>Valor</th>
                        <th>Obs/Justificativa</th>
                        <th>Editar</th>
                        <th>Deletar</th>

                    </tr>
                </thead>
                <tbody>
                    {cadastrados.map((item, i) => (
                        <tr key={i}>
                            <td>{item.tipo_pagamento}</td>
                            <td>{item.nome}</td>
                            <td>R${item.valor_pagamento}</td>
                            <td>{item.obs}</td>
                            <td>{item.data_pagamento}</td>
                            <td>
                                Editar
                            </td>
                            <td>
                                Deletar
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    }


    return(
        <CarregamentoDeDados />
    )
}