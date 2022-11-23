import { useRef ,useEffect, useState } from "react";

import "./ContainerEdicao.css";

export function ContainerEdicao() {
    return (
        <article className="container__edicao">
            <form>
                <fieldset>
                    <label htmlFor="tipo_pagamento">
                        Tipo de Pagamento: 
                    </label>
                    <select
                        name="tipo_pagamento"
                        id="tipo_pagamento"
                    >
                        <option
                        >
                            Entrada
                        </option>
                        <option
                        >
                            Despesa
                        </option>
                    </select>
                    <label htmlFor="nome">
                        Nome: 
                    </label>
                    <input
                        type="text"
                        name="nome"
                        id="name"
                        blocked
                    />
                    <label htmlFor="valor_pagamento">
                        Valor
                    </label>
                    <input
                        type="text"
                        name="valor_pagamento"
                        id="valor_pagamento"
                        required
                    />
                    <label htmlFor="obs">
                        Observação/Justificativa: 
                    </label>
                    <input
                        type="text"
                        name="obs"
                        id="obs"
                        maxLength="30"
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
        </article>
    );
};