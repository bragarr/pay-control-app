import { FaArrowCircleRight } from "react-icons/fa";

import "./FastSignUp.css";

export function FastSignUp() {

    const fechaTelaSignUp = () => {
        const signUpLateral = document.querySelector(".container__up");
        signUpLateral.classList.remove("exibe__up--lateral");
    }

    return (
        <article className="container__up">
            <FaArrowCircleRight onClick={fechaTelaSignUp} className="arrow__back"/>
            <form className="form__up">
                <h2 className="titulo__signup">Sign Up</h2>
                <fieldset className="campos__up">
                    <label htmlFor="nome">Nome</label>
                    <input type="text" name="nome" className="campo__input"/>
                    <label htmlFor="email">E-mail</label>
                    <input type="email" name="email" className="campo__input"/>
                    <label htmlFor="usuario">Usuario</label>
                    <input type="text" name="usuario" className="campo__input"/>
                    <label htmlFor="password">Senha</label>
                    <input type="password" name="password" className="campo__input"/>
                    <label htmlFor="password">Confirmar Senha</label>
                    <input type="password" name="password" className="campo__input"/>
                    <button className="button__register">Enviar</button>
                </fieldset>
            </form>
        </article>
    )
}