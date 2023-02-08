import { auth } from "../../contexts/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { LandPageInfo } from "../../components/LandPageInfo/LandPageInfo";
import { Dashboard } from "../../components/Dashboard/Dashboard";

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
        "Hello! Set your name on your profile."
        :
        user.displayName
    }

    const TituloDeApresentacaoDaPagina = () => {
        return !user
        ?
        ""
        :
        <article>
            <h2><b>Hello <NomeUsuario />!</b></h2>
            <p>Check it out a brief about your data!</p>
        </article>
    }

    const ApresentacaoPrincipalHomePage = () => {
        return !user
        ?
        <LandPageInfo />
        :
        <Dashboard pagamentos={pagamentos} user={user} />

    }

    return(
        <section>
            <TituloDeApresentacaoDaPagina />
            <ApresentacaoPrincipalHomePage />
        </section>
    )
}