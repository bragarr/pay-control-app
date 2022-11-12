import "./DebtForm.css";

export function DebtForm() {
    return (
        <form className="formulario__debitos">
            <fieldset className="formulario__cred">
                <label htmlFor="name">
                    Nome: 
                </label>
                <input
                    type="search"
                    name="nome"
                    id="name"
                    required
                />
                <label htmlFor="debito">
                    Tipo de Pagamento: 
                </label>
                <select>
                    <option
                        name="debito"
                        id="debito"
                    >
                        Débito
                    </option>
                </select>
                <label htmlFor="valor_pagamento">
                    Valor
                </label>
                <input
                    type="number"
                    name="valor_pagamento"
                    id="valor_pagamento"
                    required
                />
                <label htmlFor="data_pagamento">
                    Data da Pagamento: 
                </label>
                <input
                    type="date"
                    name="data_pagamento"
                    id="data_pagamento"
                    required
                />
            </fieldset>
            <button
                type="submit"
            >
                Registrar
            </button>
        </form>
    );
};