import { useState, useEffect } from "react";

import { CredForm } from "../../components/CredForm/CredForm";
import { DebtForm } from "../../components/DebtForm/DebtForm";

import { toast } from "react-toastify";

import "./Pagamentos.css"

export function Pagamentos() {

    const [pagamentos, setPagamentos] = useState([]);
    const [onEdit, setOnEdit] = useState(null);

    const coletarPagamentos = async () => {
        try {
            const res = await axios.get("https://controle-pagamentos-backend.herokuapp.com/");
            setPagamentos(res.data.sort((a,b) => (a.name > b.name ? 1 : -1)));
        } catch (error) {
            toast.error(error);
        }
    };

    useEffect(() => {
        coletarPagamentos();
    }, [setPagamentos])

    return (
        <section className="tela__pagamentos">
            <h2>Fluxo de Pagamentos</h2>
            <article>
                <h3>Entradas</h3>
                <CredForm onEdit={onEdit} setOnEdit={setOnEdit} coletarPagamentos={coletarPagamentos} />
            </article>
            <article>
                <h3>Despesas</h3>
                <DebtForm/>
            </article>
        </section>
    );
};