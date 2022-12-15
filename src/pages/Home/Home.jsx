import { auth } from "../../contexts/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";

import { toast } from "react-toastify";

import axios from "axios";

import "./Home.css";
import { Spinner } from "../../components/Spinner/Spinner";
import { Graficos } from "../../components/Graficos/Graficos";

export function Home() {

    const apiPagamentos= import.meta.env.VITE_API_PAGAMENTOS;

    const [user] = useAuthState(auth);

    // dados para dashboard principal

    let entradas = 0;
    let despesas = 0;
    
    const [pagamentos, setPagamentos] = useState([]);

    const getPagamentos = async () => {
        try {
            const res = await axios.get(apiPagamentos);
            setPagamentos(res.data.sort((a,b) => (a.valor_pagamento < b.valor_pagamento ? 1 : -1)));
        } catch (error) {
            toast.error(error);
        }
    };

    useEffect(() => {
        getPagamentos();
    }, []);

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
        <h2 className="secao_homepage">Opa! É muito bom ter você por aqui! </h2>
        :
        <article className="secao_homepage">
            <h2><b>Olá <NomeUsuario /></b></h2>
            <p>Confira abaixo o resumo de suas movimentações!</p>
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
                    <ul>
                        <li>Cadastro de Pessoas/Empresas</li>
                        <li>Registro de Pagamentos</li>
                        <li>Controle dos Dados</li>
                        <li>Resumo global de todas as informações</li>
                    </ul>
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
            return (
                <article className="posicao__grafica">
                    <div className="resumo__saldo">
                        <h3 className="dados__saldo">Balanço Total<br/>(Entrada - Despesas)</h3>
                        <p className="dados__saldo">R${((entradas)-(despesas)).toFixed(2)}</p>
                    </div>
                    <Graficos entradas={entradas} despesas={despesas}/>
                    <h4>Principais Entradas</h4>
                    <h4>Principais Despesas</h4>
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

// res.data.sort((a,b) => (a.name > b.name ? 1 : -1))