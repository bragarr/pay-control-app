import axios from "axios";
import { useRef ,useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../contexts/Firebase";

import { toast } from "react-toastify";
import { Spinner } from "../Spinner/Spinner";


export function PayInput({ coletarPagamentos}) {
    const api = import.meta.env.VITE_API;
    const apiPagamentos= import.meta.env.VITE_API_PAGAMENTOS;

    const [userOn] = useAuthState(auth);

    const [cadastrados, setCadastrados] = useState([]);

    const getCadastrados = async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        const listaCadastrados = data.filter((lista) => lista.usuario===userOn.uid)
        setCadastrados(listaCadastrados);
    }

    useEffect(()=>{
        const apiUrl = api;
        getCadastrados(apiUrl);
    },[])

    const ref = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const pagamentoAtual = ref.current;
    
        await axios
            .post(apiPagamentos, {
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
        <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        :
        <form ref={ref} onSubmit={handleSubmit} className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="tipo_pagamento" className="form-label">Payment type</label>
                    <select name="tipo_pagamento" id="tipo_pagamento" className="form-select">
                        <option>Income</option>
                        <option>Expense</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label htmlFor="nome" className="form-label">Name</label>
                    <select name="nome" id="name" className="form-select">
                        {cadastrados.length > 0 && cadastrados.map((item) =><option key={item.id}>{item.nome}</option>)}
                    </select>
                </div>
                <div class="col-md-6">
                    <label htmlFor="valor_pagamento" className="form-label">Value ($)</label>
                    <input
                        type="text"
                        name="valor_pagamento"
                        id="valor_pagamento"
                        placeholder="1000.00 - Type only numbers..."
                        required
                        class="form-control"
                    />
                </div>
                <div class="col-md-6">
                    <label htmlFor="obs" className="form-label">Description</label>
                    <input
                        type="text"
                        name="obs"
                        id="obs"
                        maxLength="30"
                        placeholder="Payment description"
                        required
                        class="form-control"
                    />
                </div>
                <div class="col-md-6">
                    <label htmlFor="data_pagamento" className="form-label">Date:</label>
                    <input type="date" name="data_pagamento" id="data_pagamento" required class="form-control" />
                </div>
                <div>
                    <button type="submit" class="btn btn-outline-success">Save</button>
                </div>
        </form>
    }

    return (
        <CarregamentoDeDados />
    );
};