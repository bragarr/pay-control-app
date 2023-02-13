import axios from "axios";
import { useRef ,useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../contexts/Firebase";
import { toast } from "react-toastify";

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

    const selectCategory = () => {
        const namePersonCompany = document.querySelector(".option__selected").value;
        const formInputCategory = document.querySelector(".category");
        const categoryRegistered = cadastrados.filter((item) => namePersonCompany===item.nome);
        formInputCategory.value = categoryRegistered[0].categoria;
    }

    useEffect(()=>{
        getCadastrados(api);
    },[]);

    const ref = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const pagamentoAtual = ref.current;
    
        await axios
            .post(apiPagamentos, {
                nome: pagamentoAtual.nome.value,
                tipo_pagamento: pagamentoAtual.tipo_pagamento.value,
                categoria: pagamentoAtual.category.value,
                valor_pagamento: pagamentoAtual.valor_pagamento.value,
                obs: pagamentoAtual.obs.value,
                data_pagamento: pagamentoAtual.data_pagamento.value,
                usuario: userOn.uid
            })
            .then (({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data))

        pagamentoAtual.nome.value = "";
        pagamentoAtual.category.value = "";
        pagamentoAtual.valor_pagamento.value = "";
        pagamentoAtual.obs.value = "";
        pagamentoAtual.data_pagamento.value = "";

    }

    const CarregamentoDeDados = () => {
        return cadastrados.length <= 0
        ?
        <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
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
                <div className="col-md-6">
                    <label htmlFor="nome" className="form-label">Name</label>
                    <select name="nome" id="name" className="form-select option__selected" onChange={selectCategory}>
                        <option>Select...</option>
                        {cadastrados.length > 0 && cadastrados.map((item, i) => <option key={i}>{item.nome}</option>)}
                    </select>
                </div>
                <div className="col-md-6">
                    <label htmlFor="category" className="form-label">Category</label>
                    <input
                        type="text"
                        name="category"
                        id="category"
                        className="form-control category"
                        disabled
                        defaultValue={""}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="valor_pagamento" className="form-label">Value ($)</label>
                    <input
                        type="text"
                        name="valor_pagamento"
                        id="valor_pagamento"
                        placeholder="1000.00 - Type only numbers..."
                        required
                        className="form-control"
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="obs" className="form-label">Description</label>
                    <input
                        type="text"
                        name="obs"
                        id="obs"
                        maxLength="30"
                        placeholder="Payment description"
                        required
                        className="form-control"
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="data_pagamento" className="form-label">Date:</label>
                    <input type="date" name="data_pagamento" id="data_pagamento" required className="form-control" />
                </div>
                <div>
                    <button type="submit" className="btn btn-outline-success">Save</button>
                </div>
        </form>
    }
    return (
        <CarregamentoDeDados />
    );
};