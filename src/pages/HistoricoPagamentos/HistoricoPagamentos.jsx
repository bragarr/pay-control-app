import { useState, useEffect } from "react";

import { toast } from "react-toastify";

import { Spinner } from "../../components/Spinner/Spinner";

import { ContainerEdicao } from "../../components/ContainerEdicao/ContainerEdicao";

import { auth } from "../../contexts/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import axios from "axios";

import "./HistoricoPagamentos.css"


export function HistoricoPagamentos() {

    const [userOn] = useAuthState(auth);

    const [cadastrados, setCadastrados] = useState([]);
    const [onEdit, setOnEdit] = useState(null);

    const handleEdit = (item) => {
        setOnEdit(item);
    };

    const getcadastrados = async () => {
        try {
            const res = await axios.get("https://controle-pagamentos-backend-api.onrender.com/pagamentos");
            const listaCadastrados = res.data.sort((a,b) => (a.data_pagamento < b.data_pagamento ? 1 : -1));
            setCadastrados(listaCadastrados.filter((lista) => lista.usuario===userOn.uid));
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
        <section className="resumo__pagamentos">
            <h2>Histórico de Pagamentos</h2>
            <table className="dados__armazenados">
                <thead>
                    <tr>
                        <th className="tipo__pagamento">Tipo</th>
                        <th className="info__valor">Valor</th>
                        <th className="info__data">Data</th>
                        <th className="campos__edicao">Editar</th>
                        <th className="campos__edicao">Deletar</th>

                    </tr>
                </thead>
                <tbody>
                    {cadastrados.map((item, i) => (
                        <tr key={i}>
                            <td className="tipo__pagamento">{item.tipo_pagamento}</td>
                            <td className="info__valor">R${item.valor_pagamento}</td>
                            <td className="info__data">
                                {
                                item.data_pagamento[8]+item.data_pagamento[9]+
                                item.data_pagamento[7]+
                                item.data_pagamento[5]+item.data_pagamento[6]+
                                item.data_pagamento[4]+
                                item.data_pagamento[0]+item.data_pagamento[1]+item.data_pagamento[2]+item.data_pagamento[3]
                                }
                            </td>
                            <td className="campos__edicao"
                                onClick={handleEdit(item)}
                            >
                                Editar
                            </td>
                            <td className="campos__edicao">
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
            <ContainerEdicao onEdit={onEdit} setOnEdit={setOnEdit} />
        </section>
    )
}