import { useRef ,useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../contexts/Firebase";

import axios from "axios";

import { Spinner } from "../Spinner/Spinner";

import { toast } from "react-toastify";

import "./RegistroPagamentos.css";

export function RegistroPagamentos({ coletarPagamentos}) {

    const [userOn] = useAuthState(auth);

    const [cadastrados, setCadastrados] = useState([]);

    const getCadastrados = async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        const listaCadastrados = data.filter((lista) => lista.usuario===userOn.uid)
        setCadastrados(listaCadastrados);
    }

    useEffect(()=>{
        const apiUrl = "https://controle-pagamentos-backend-api.onrender.com/";
        getCadastrados(apiUrl);
    },[])

    const ref = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const pagamentoAtual = ref.current;
    
        await axios
            .post("https://controle-pagamentos-backend-api.onrender.com/pagamentos", {
                nome: pagamentoAtual.nome.value,
                tipo_pagamento: pagamentoAtual.tipo_pagamento.value,
                valor_pagamento: pagamentoAtual.valor_pagamento.value,
                obs: pagamentoAtual.obs.value,
                data_pagamento: pagamentoAtual.data_pagamento.value,
                usuario: userOn.uid
            })
            .then (({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data))

        pagamentoAtual.nome.value = "";
        pagamentoAtual.valor_pagamento.value = "";
        pagamentoAtual.obs.value = "";
        pagamentoAtual.data_pagamento.value = "";

    }

    const CarregamentoDeDados = () => {
        return cadastrados.length <= 0
        ?
        <Spinner />
        :
        <form ref={ref} onSubmit={handleSubmit} className="formulario__cred">
            <fieldset className="campos__preenchimento">
                <label htmlFor="tipo_pagamento">
                    Tipo: 
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
                <label htmlFor="nome">
                    Nome: 
                </label>
                <select
                    name="nome"
                    id="name"
                >
                    {cadastrados.length > 0 && cadastrados.map((item) =><option key={item.id}>{item.nome}</option>)}
                </select>
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
                    Obs: 
                </label>
                <input
                    type="text"
                    name="obs"
                    id="obs"
                    maxLength="30"
                    required
                />
                 <label htmlFor="data_pagamento">
                    Data:
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
                className="botao__pagamento"
            >
                Registrar
            </button>
        </form>
    }

    return (
        <CarregamentoDeDados />
    );
};