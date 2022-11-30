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
            const res = await axios.get("https://controle-pagamentos-backend.herokuapp.com/pagamentos");
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
            }
        })

        return (
            <table>
                <thead>
                    <tr>
                        <th>Entradas</th>
                        <th>Despesas</th>
                        <th>Saldo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{entradas}</td>
                        <td>500</td>
                        <td>500</td>
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
                <form className="formulario__busca">
                    <fieldset className="campos__filtro">
                        <select>
                            <option value=""></option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                        </select>
                        <select>
                            <option value=""></option>
                            <option value="">Janeiro</option>
                            <option value="">Fevereiro</option>
                            <option value="">Março</option>
                            <option value="">Abril</option>
                            <option value="">Maio</option>
                            <option value="">Junho</option>
                            <option value="">Julho</option>
                            <option value="">Agosto</option>
                            <option value="">Setembro</option>
                            <option value="">Outubro</option>
                            <option value="">Novembro</option>
                            <option value="">Dezembro</option>
                        </select>
                        <button type="button">Filtrar</button>
                    </fieldset>
                </form>
            </article>
            <article>
                <DefineDashBoard />
                <table>
                    <thead>
                        <tr>
                            <th>Jan</th>
                            <th>Fev</th>
                            <th>Mar</th>
                            <th>Abr</th>
                            <th>Mai</th>
                            <th>Jun</th>
                            <th>Jul</th>
                            <th>Ago</th>
                            <th>Set</th>
                            <th>Out</th>
                            <th>Nov</th>
                            <th>Dez</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>500</td>
                            <td>500</td>
                            <td>500</td>
                            <td>500</td>
                            <td>500</td>
                            <td>500</td>
                            <td>500</td>
                            <td>500</td>
                            <td>500</td>
                            <td>500</td>
                            <td>500</td>
                            <td>500</td>
                        </tr>
                    </tbody>
                </table>
            </article>
        </section>
    )
}