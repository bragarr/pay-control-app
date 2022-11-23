import { auth } from "../../contexts/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import "./Home.css";

export function Home() {

    const date = new Date();
    const dataAtual = date.toLocaleDateString();

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

    return(
        <section>
            <DefineMensagemHome />
            <article>
                
            </article>
        </section>
    )
}