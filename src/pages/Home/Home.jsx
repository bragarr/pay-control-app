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
                            <td>500</td>
                            <td>500</td>
                            <td>500</td>
                        </tr>
                    </tbody>
                </table>
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