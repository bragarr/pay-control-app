import { auth } from "../../contexts/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import "./Home.css";

export function Home() {

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
        "Aqui será a mensagem de boas vindas!"
        :
        <p>Seja Bem-vindo <NomeUsuario /></p>
    }

    return(
        <section className="secao_homepage">
            <DefineMensagemHome />
        </section>
    )
}