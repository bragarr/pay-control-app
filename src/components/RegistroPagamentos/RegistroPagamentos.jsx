import { useRef ,useEffect } from "react";
import axios from "axios";

import { toast } from "react-toastify";

import "./RegistroPagamentos.css";

export function RegistroPagamentos({ coletarPagamentos, onEdit, setOnEdit }) {

    const ref = useRef();

    useEffect(() => {
        if(onEdit) {
            const user = ref.current;

            user.nome.value = onEdit.nome;
            user.tipo_pagamento.value = onEdit.tipo_pagamento;
            user.valor_pagamento.value = onEdit.valor_pagamento;
            user.obs.value = onEdit.obs;
            user.data_pagamento.value = onEdit.data_pagamento;
        }
    }, [onEdit]);

    const handleSubmitCred = async (e) => {
        e.preventDefault();

        const user = ref.current;
        
        if(onEdit) {
            await axios
                .put("https://controle-pagamentos-backend.herokuapp.com/pagamentos" + onEdit.id, {
                    nome: user.nome.value,
                    tipo_pagamento: user.tipo_pagamento.value,
                    valor_pagamento: user.valor_pagamento.value,
                    obs: user.obs.value,
                    data_pagamento: user.data_pagamento.value,
                })

                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        } else {
            await axios
                .post("https://controle-pagamentos-backend.herokuapp.com/pagamentos", {
                    nome: user.nome.value,
                    tipo_pagamento: user.tipo_pagamento.value,
                    valor_pagamento: user.valor_pagamento.value,
                    obs: user.obs.value,
                    data_pagamento: user.data_pagamento.value,
                })
                .then (({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data))
        }

        user.nome.value = "";
        user.valor_pagamento.value = "";
        user.obs.value = "";
        user.data_pagamento.value = "";

        setOnEdit(null);
        coletarPagamentos();
    }


    return (
        <form ref={ref} onSubmit={handleSubmitCred}>
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
                <label htmlFor="tipo_pagamento">
                    Tipo de Pagamento: 
                </label>
                <select
                    name="tipo_pagamento"
                    id="tipo_pagamento"
                >
                    <option
                        className="opcao__selecionada"
                    >
                        Crédito (Entrada de Pagamentos)
                    </option>
                    <option
                        className="opcao__selecionada"    
                    >
                        Débito (Saída para Despesas)
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
                <label htmlFor="obs">
                    Observação/Justificativa: 
                </label>
                <input
                    type="text"
                    name="obs"
                    id="obs"
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