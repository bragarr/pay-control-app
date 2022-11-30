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
                <form>
                    <fieldset>
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