import { useState, useEffect } from "react";

import { RegistroPagamentos } from "../../components/RegistroPagamentos/RegistroPagamentos";

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
            <article className="container__entradas">
                <h3>Registro de Pagamentos/Despesas</h3>
                <RegistroPagamentos onEdit={onEdit} setOnEdit={setOnEdit} coletarPagamentos={coletarPagamentos} />
            </article>
        </section>
    );
};