import { useState, useEffect } from "react";

import { toast } from "react-toastify";

import { Spinner } from "../../components/Spinner/Spinner";

import { ContainerEdicao } from "../../components/ContainerEdicao/ContainerEdicao";

import axios from "axios";

import "./HistoricoPagamentos.css"


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
        // const verificar = cadastrados[0].data_pagamento;
        // const testeData = new Date(verificar);
        // const testeAno = testeData.getFullYear();
        // console.log(testeAno);
        // console.log(verificar);
    }, [setCadastrados]);

    const CarregamentoDeDados = () => {
        return cadastrados.length <= 0
        ?
        <Spinner />
        :
        <section className="resumo__pagamentos">
            <h2>Histórico de Pagamentos</h2>
            <table>
                <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Valor</th>
                        <th>Data</th>
                        <th>Editar</th>
                        <th>Deletar</th>

                    </tr>
                </thead>
                <tbody>
                    {cadastrados.map((item, i) => (
                        <tr key={i}>
                            <td>{item.tipo_pagamento}</td>
                            <td>R${item.valor_pagamento}</td>
                            <td>
                                {
                                item.data_pagamento[8]+item.data_pagamento[9]+
                                item.data_pagamento[7]+
                                item.data_pagamento[5]+item.data_pagamento[6]+
                                item.data_pagamento[4]+
                                item.data_pagamento[0]+item.data_pagamento[1]+item.data_pagamento[2]+item.data_pagamento[3]
                                }
                            </td>
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
        <section>
            <CarregamentoDeDados />
            <ContainerEdicao />
        </section>
    )
}