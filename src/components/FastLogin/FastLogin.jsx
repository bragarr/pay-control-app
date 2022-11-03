import { useState, useEffect } from "react";

import { auth } from "../../contexts/Firebase";

import { useAuth } from "../../Hooks/useAuth";

import { useNavigate } from 'react-router-dom';

import { useAuthState } from "react-firebase-hooks/auth";

import { FaArrowCircleRight } from "react-icons/fa";

import { User } from "../User/User";

import "./FastLogin.css";


export function FastLogin() {

    const [user] = useAuthState(auth);
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const realizarLogin = () => {
        const res = login(auth, email, password);
        setEmail("");
        setPassword("");
        navigate("/");
    }

    const TituloSecao = () => {
        return !user
        ?
        <h2 className="tituto__login">Login</h2>
        :
        <h2 className="tituto__login">Meu Perfil</h2>

    }

    const ExibePerfil = () => {
        return !user
        ?
        ""
        :
        <User />
    }
    
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
            <FaArrowCircleRight onClick={fechaTelaLogin} className="arrow__back"/>
            <TituloSecao />
            <ExibePerfil />
            <form className="form__login">
                <fieldset className="campos__login">
                    <label htmlFor="email">
                        E-mail
                    </label>
                    <input
                        type="email"
                        name="email"
                        className="campo__input"
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
                        value={password}
                        onChange={(e) => [setPassword(e.target.value)]}
                        required
                    />
                    <button
                        type="button"
                        className="button__register"
                        onClick={realizarLogin}
                    >
                        Acessar
                    </button>
                    <p>
                        Ainda não possui acesso?
                        <span
                            className="accesso__signup"
                            onClick={acessoSignUp}
                        >
                            Registre-se
                        </span>
                    </p>
                </fieldset>
            </form>
        </article>
    )
}