import { auth } from "../../contexts/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import "./Home.css";

export function Home() {

    const [user] = useAuthState(auth);

    const DefineMensagemHome = () => {
        return !user
        ?
        "Aqui será a mensagem de boas vindas!"
        :
        <p>Seja Bem-vindo {user.email}</p>
    }

    return(
        <section className="secao_homepage">
            <p>Apresentação das opções da aplicação</p>
            <DefineMensagemHome />
        </section>
    )
}