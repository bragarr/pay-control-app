import { useRef ,useEffect, useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";

import "./RegistroPagamentos.css";

export function RegistroPagamentos({ coletarPagamentos}) {

    const [cadastrados, setCadastrados] = useState([]);

    const getCadastrados = async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        setCadastrados(data);
    }

    useEffect(()=>{
        const apiUrl = "https://controle-pagamentos-backend.herokuapp.com/";
        getCadastrados(apiUrl);
    },[])

    const ref = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = ref.current;
    
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

        user.nome.value = "";
        user.valor_pagamento.value = "";
        user.obs.value = "";
        user.data_pagamento.value = "";

    }


    return (
        <form ref={ref} onSubmit={handleSubmit}>
            <fieldset className="formulario__cred">
                <label htmlFor="tipo_pagamento">
                    Tipo de Pagamento: 
                </label>
                <select
                    name="tipo_pagamento"
                    id="tipo_pagamento"
                    className="tipo__pagamento"
                >
                    <option
                        className="opcao__1"
                    >
                        Entrada
                    </option>
                    <option
                        className="opcao__2"
                    >
                        Despesa
                    </option>
                </select>
                <label htmlFor="name">
                    Nome: 
                </label>
                <select>
                    {cadastrados.length > 0 && cadastrados.map((cadastrado) => {
                        <option>{cadastrado.nome}</option>
                    }
                    )}
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