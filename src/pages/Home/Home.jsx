import { auth } from "../../contexts/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";

import { toast } from "react-toastify";

import axios from "axios";

import "./Home.css";
import { Spinner } from "../../components/Spinner/Spinner";

export function Home() {

    const date = new Date();
    const dataAtual = date.toLocaleDateString();

    // dados para dashboard principal

    let entradas = 0;
    let despesas = 0;
    let saldo = 0;
    
    const [pagamentos, setPagamentos] = useState([]);

    const getPagamentos = async () => {
        try {
            const res = await axios.get("https://controle-pagamentos-backend.onrender.com/pagamentos");
            setPagamentos(res.data.sort((a,b) => (a.name > b.name ? 1 : -1)));
        } catch (error) {
            toast.error(error);
        }
    };

    useEffect(() => {
        getPagamentos();
    }, [setPagamentos]);

    const SaldoDespesas = () => {
        pagamentos.map((item) => {
            if(item.tipo_pagamento==="Entrada") {
                entradas += item.valor_pagamento;
            } else if (item.tipo_pagamento==="Despesa") {
                despesas += item.valor_pagamento;
            }
        })

        return (
            <table>
                <thead>
                    <tr>
                        <th>Entradas</th>
                        <th>Despesas</th>
                        <th>Saldo Atual</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>R${entradas/2}</td>
                        <td>R${despesas/2}</td>
                        <td>R${(entradas - despesas)/2}</td>
                    </tr>
                </tbody>
            </table>
        )
    }

    // useEffect(() => {
    //     saldoDespesas();
    //     console.log(entradas);
    // }, [entradas]);


    const [user] = useAuthState(auth);

    const NomeUsuario = () => {
        return user.displayName===null
        ?
        ""
        :
        user.displayName
    }

    const DefineMensagemHome = () => {
        return !user
        ?
        <article className="secao_homepage">
            <h2>Resumo Geral</h2>
            <h3>{dataAtual}</h3>
        </article>
        :
        <article className="secao_homepage">
            <h2>Seja Bem-vindo <NomeUsuario /></h2>
            <h3>Resumo Geral</h3>
            <h4>{dataAtual}</h4>
        </article>
    }

    const DefineDashBoard = () => {
        return pagamentos.length <= 0
        ?
        "carregando..."
        :
        <SaldoDespesas />
    }

    return(
        <section className="dashboard__principal">
            <DefineMensagemHome />
            <article>
                <DefineDashBoard />
            </article>
        </section>
    )
}