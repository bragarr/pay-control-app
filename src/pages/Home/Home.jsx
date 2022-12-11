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

    const NomeUsuario = () => {
        return user.displayName===null
        ?
        "Novo Usuário. Acesse o seu Perfil e defina as suas configurações!"
        :
        user.displayName
    }

    const HomePageDeApresentacaoParaUsuario = () => {
        return pagamentos.length <= 0
        ?
        <Spinner />
        :
        <ApresentacaoPrincipalHomePage />
    }

    const TituloDeApresentacaoDaPagina = () => {
        return !user
        ?
        <h2>Opa! É muito bom ter você por aqui! </h2>
        :
        <article className="secao_homepage">
            <h2>Seja Bem-vindo <NomeUsuario /></h2>
            <h3>Resumo Geral</h3>
            <h4>{dataAtual}</h4>
        </article>
    }

    const ApresentacaoPrincipalHomePage = () => {
        if(!user) {
            return (
                <article className="container__apresentacao">
                    <h2>O que é o Controle de Pagamentos?</h2>
                    <p>
                        Esta é uma aplicação que possui como onjetivo principal realizar um controle 
                        de fluxo de pagamentos. Basicamente, registrando entradas e saídas de pagamentos 
                        como em um fluxo de caixa. Desta forma, a plataforma faz um controle de 
                        registros com todas as entradas e depesas informando para o usuário seu saldo, 
                        podendo ser positivo ou negativo
                    </p>
                    <h3>O que compõe o registro de pagamentos?</h3>
                    <p>
                        <ul>
                            <li>Cadastro de Pessoas/Empresas</li>
                            <li>Registro de Pagamentos</li>
                            <li>Controle dos Dados</li>
                            <li>Resumo global de todas as informações</li>
                        </ul>
                    </p>
                    <h3>Cadastro de Pessoas/Empresas</h3>
                    <p>
                        Aqui você pode realizar o cadastro de pessoas e empresas e assim montar
                        uma base de dados de informações para facilitar o registro de pagamentos
                        e assim formular o fluxo de caixa.
                    </p>
                    <figure>
                        <img src="#" alt="#" />
                        <figcaption>Representação da legenda</figcaption>
                    </figure>
                    <h3>Registro de Pagamentos</h3>
                    <p>
                        Após contruir a base de cadastros com todas as pessoas e empresas que deseja
                        realizar o controle de pagamentos, você pode começar a criar os registros de 
                        pagamentos para iniciar a cadeia de dados para gerar o seu fluxo de caixa.
                    </p>
                    <figure>
                        <img src="#" alt="#" />
                        <figcaption>Representação da legenda</figcaption>
                    </figure>
                    <h3>Controle dos dados</h3>
                    <p>
                        Crie, Edite e Delete todos os dados que precisar, você pode gerenciar todas
                        as informações necessárias para realizar o seu controle de pagamentos.
                    </p>
                    <figure>
                        <img src="#" alt="#" />
                        <figcaption>Representação da imagem</figcaption>
                    </figure>
                    <h3>Resumo Global de Todas as Informações</h3>
                    <p>
                        Tenha tudo resumido em uma dashboard com as principais informações do seu
                        fluxo de pagamentos.
                    </p>
                    <figure>
                        <img src="#" alt="#" />
                        <figcaption>Representação da imagem</figcaption>
                    </figure>
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
                                <td>R${entradas}</td>
                                <td>R${despesas}</td>
                                <td>R${(entradas - despesas)}</td>
                            </tr>
                        </tbody>
                    </table>
                    <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="ColumnChart"
                    data={data}
                    options={options}
                    className="grafico"
                    />
                </article>
            )
        }
    }

    return(
        <section className="dashboard__principal">
            <TituloDeApresentacaoDaPagina />
            <HomePageDeApresentacaoParaUsuario />
        </section>
    )
}