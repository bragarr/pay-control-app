import { CredForm } from "../../components/CredForm/CredForm";
import { DebtForm } from "../../components/DebtForm/DebtForm";

import "./Pagamentos.css"

export function Pagamentos() {
    return (
        <section className="tela__pagamentos">
            <h2>Fluxo de Pagamentos</h2>
            <article>
                <h3>Entradas</h3>
                <CredForm />
            </article>
            <article>
                <h3>Despesas</h3>
                <DebtForm />
            </article>
        </section>
    );
};