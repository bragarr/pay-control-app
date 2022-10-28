import { Link } from "react-router-dom";

import "./FastLogin.css";

export function FastLogin() {

    return (
        <article className="container__login">
            <form className="form__login">
                <fieldset className="campos__login">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" name="email" className="campo__email"/>
                    <label htmlFor="password">Senha</label>
                    <input type="password" name="password" className="campo__email"/>
                    <p>Ainda não possui acesso? <Link to={"signup"}>Registre-se</Link></p>
                </fieldset>
            </form>
        </article>
    )
}