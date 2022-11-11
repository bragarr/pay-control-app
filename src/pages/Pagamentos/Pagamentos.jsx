import { CredForm } from "../../components/CredForm/CredForm";
import { DebtForm } from "../../components/DebtForm/DebtForm";

export function Pagamentos() {
    return (
        <section>
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