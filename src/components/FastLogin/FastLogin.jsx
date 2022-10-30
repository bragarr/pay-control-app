import { FaArrowCircleRight } from "react-icons/fa";

import "./FastLogin.css";

export function FastLogin() {
    
    const acessoSignUp = () => {
        const loginLateral = document.querySelector(".container__login");
        loginLateral.classList.remove("exibe__login--lateral");

        const signUpLateral = document.querySelector(".container__up");
        signUpLateral.classList.add("exibe__up--lateral");
    }

    const fechaTelaLogin = () => {
        const loginLateral = document.querySelector(".container__login");
        loginLateral.classList.remove("exibe__login--lateral");
    }

    return (
        <article className="container__login">
            <FaArrowCircleRight onClick={fechaTelaLogin}/>
            <h2>Sign In</h2>
            <form className="form__login">
                <fieldset className="campos__login">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" name="email" className="campo__email"/>
                    <label htmlFor="password">Senha</label>
                    <input type="password" name="password" className="campo__email"/>
                    <p>Ainda não possui acesso? <span className="accesso__signup" onClick={acessoSignUp}>Registre-se</span></p>
                </fieldset>
            </form>
        </article>
    )
}