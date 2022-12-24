import { auth } from "../../contexts/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { ApresentacaoPlataforma } from "../../components/ApresentacaoPlataforma/ApresentacaoPlataforma";
import { InformacoesGeraisUsuario } from "../../components/InformacoesGeraisUsuario/InformacoesGeraisUsuario";

import "./Home.css";

export function Home() {

    const apiPagamentos= import.meta.env.VITE_API_PAGAMENTOS;

    const [user] = useAuthState(auth);
    
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

    const TituloDeApresentacaoDaPagina = () => {
        return !user
        ?
        <h2 className="secao_homepage">É muito bom ter você por aqui!</h2>
        :
        <article className="secao_homepage">
            <h2><b>Olá <NomeUsuario />!</b></h2>
            <p>Confira abaixo o resumo de suas movimentações!</p>
        </article>
    }

    const ApresentacaoPrincipalHomePage = () => {
        return !user
        ?
        <ApresentacaoPlataforma />
        :
        <InformacoesGeraisUsuario pagamentos={pagamentos} user={user} />

    }

    return(
        <section className="dashboard__principal">
            <TituloDeApresentacaoDaPagina />
            <ApresentacaoPrincipalHomePage />
        </section>
    )
}