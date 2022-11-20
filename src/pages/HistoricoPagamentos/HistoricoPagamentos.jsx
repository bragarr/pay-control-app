import { useState, useEffect } from "react";
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


    return(
        <section>
            <h2>Histórico de Pagamentos</h2>
            <table className="table__users">
            <thead className="table__head">
                <tr className="fields__table">
                    <th className="info__inputs">Tipo Pagamento</th>
                    <th className="info__inputs">Nome</th>
                    <th className="info__inputs input__fone">Valor</th>
                    <th className="info__inputs input__tag">Obs/Justificativa</th>
                    <th className="info__actions">Editar</th>
                    <th className="info__actions">Deletar</th>

                </tr>
            </thead>
            <tbody className="table__body">
                {cadastrados.map((item, i) => (
                    <tr key={i}>
                        <td className="info__inputs info__body">Tipo Pagamento</td>
                        <td className="info__inputs info__body input__email">Nome</td>
                        <td className="info__inputs info__body input__fone">Valor</td>
                        <td className="info__inputs info__body input__tag--desc">Obs/Justificativa</td>
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
    )
}