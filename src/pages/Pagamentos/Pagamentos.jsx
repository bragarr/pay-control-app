import { RegistroPagamentos } from "../../components/RegistroPagamentos/RegistroPagamentos";

import "./Pagamentos.css"

export function Pagamentos() {

    return (
        <section className="tela__pagamentos">
            <h2>Fluxo de Pagamentos</h2>
            <article className="container__entradas">
                <h3>Registro de Entradas/Despesas</h3>
                <RegistroPagamentos />
            </article>
        </section>
    );
};