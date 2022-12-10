import { auth } from "../../contexts/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

import { toast } from "react-toastify";

import axios from "axios";

import "./Home.css";
import { Spinner } from "../../components/Spinner/Spinner";

export function Home() {

    const apiPagamentos= import.meta.env.VITE_API_PAGAMENTOS;

    const [user] = useAuthState(auth);

    const date = new Date();
    const dataAtual = date.toLocaleDateString();

    // dados para dashboard principal

    let entradas = 0;
    let despesas = 0;
    let saldo = 0;
    
    const [pagamentos, setPagamentos] = useState([]);

    const [options, setOptions] = useState({
        title: 'Posição da carteira de pagamentos'
    });

    const getPagamentos = async () => {
        try {
            const res = await axios.get(apiPagamentos);
            setPagamentos(res.data.sort((a,b) => (a.name > b.name ? 1 : -1)));
        } catch (error) {
            toast.error(error);
        }
    };

    useEffect(() => {
        getPagamentos();
    }, [setPagamentos]);

    const SaldoDespesas = () => {
        if(!user) {
            return (
                <article>
                    <h2>Ainda não há pagamentos registrados aqui!</h2>
                    <p>Se você ainda não possuí cadastro, registre-se logo!</p>
                </article>
            )
        } else {
            pagamentos.map((item) => {
                if(item.tipo_pagamento==="Entrada" && item.usuario===user.uid) {
                    entradas += item.valor_pagamento;
                } else if (item.tipo_pagamento==="Despesa" && item.usuario===user.uid) {
                    despesas += item.valor_pagamento;
                }
            })
    
            const [data, setData] = useState([
                ['Ano',"Entrada", "Despesa", "Saldo"],
                ['2022',(entradas/2),(despesas/2) ,(entradas - despesas)/2]
            ]);
            return (
                <article className="posicao__grafica">
                    <table className="tabela__dados">
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
                    <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="ColumnChart"
                    data={data}
                    options={options}
                    />
                </article>
            )
        }
    }

    const NomeUsuario = () => {
        return user.displayName===null
        ?
        "Nome de usuário ainda não definido. Por favor acesse o seu perfil e ajuste os seus dados"
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
            <DefineDashBoard />
        </section>
    )
}