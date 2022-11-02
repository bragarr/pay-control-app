import { useState } from "react";

import { auth } from "../../contexts/Firebase";

import { FaArrowCircleRight } from "react-icons/fa";

import { useAuth } from "../../Hooks/useAuth";

import { useNavigate } from 'react-router-dom';

import "./FastSignUp.css";

export function FastSignUp() {
    const { novoUsuario } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");

    const verificacaoCadastro = () => {
        if(password !== confPassword) {
            alert("senha");
            return;
        }

        const res = novoUsuario(auth, email, password);

        setEmail("");
        setPassword("")
        setConfPassword("")

        navigate("/");
    }

    const fechaTelaSignUp = () => {
        const signUpLateral = document.querySelector(".container__up");
        signUpLateral.classList.remove("exibe__up--lateral");
    }

    return (
        <article className="container__up">
            <FaArrowCircleRight onClick={fechaTelaSignUp} className="arrow__back"/>
            <form className="form__up">
                <h2 className="titulo__signup">Sign Up</h2>
                <p>Preencha todos os campos</p>
                <fieldset className="campos__up">
                    <label htmlFor="email">
                        E-mail
                    </label>
                    <input 
                        type="email"
                        name="email"
                        className="campo__input"
                        id="email"
                        value={email}
                        onChange={(e) => [setEmail(e.target.value)]}
                        required
                    />
                    <label htmlFor="password">
                        Senha
                    </label>
                    <input 
                        type="password"
                        name="password"
                        className="campo__input"
                        id="password"
                        value={password}
                        onChange={(e) => [setPassword(e.target.value)]}
                        required
                    />
                    <label htmlFor="confirmar__password">
                        Confirmar Senha
                    </label>
                    <input
                        type="password"
                        name="confirmar__password"
                        className="campo__input"
                        id="confirmar__password"
                        value={confPassword}
                        onChange={(e) => [setConfPassword(e.target.value)]}
                        required
                    />
                    <button
                        type="button"
                        className="button__register"
                        onClick={verificacaoCadastro}
                    >
                        Cadastrar
                    </button>
                </fieldset>
            </form>
        </article>
    )
}