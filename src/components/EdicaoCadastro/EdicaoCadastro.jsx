import { useState, useEffect, useRef } from "react";

import "./EdicaoCadastro.css";

export function EdicaoCadastro({cadastrados, setCadastrados}) {

    const api= import.meta.env.VITE_API;

    const ref = useRef();
    
    const handleDelete = async (id) => {
        await axios
            .delete(api + id)
            .then(({ data }) => {
                const newArray = cadastrados.filter((user) => user.id !== id);
                setCadastrados(newArray);
                toast.success(data);
            })

            .catch(({ data }) => toast.error(data));
            
        setOnEdit(null);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const pagamento = ref.current;
        
        if(onEdit) {
            await axios
                .put(api + onEdit.id, {
                    tipo_pagamento: pagamento.tipo_pagamento.value,
                    nome: pagamento.nome.value,
                    valor_pagamento: pagamento.valor_pagamento.value,
                    obs: pagamento.obs.value,
                    data_pagamento: pagamento.data_pagamento.value
                })

                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        }
    }

    return (
        <article className="container__edicao">
            <form>
                <fieldset className="form__edicao">
                    <label htmlFor="tipo_pagamento">
                        Tipo: 
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
                <button type="submit">Atualizar</button>
                <button type="submit">Deletar</button>
            </form>
        </article>
    );
};