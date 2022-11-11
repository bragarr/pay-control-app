import "./CredForm.css";

export function CredForm() {
    return (
        <form>
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
                <label htmlFor="credito">
                    Tipo de Pagamento: 
                </label>
                <select>
                    <option
                        name="credito"
                        id="credito"
                    >
                        Crédito
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