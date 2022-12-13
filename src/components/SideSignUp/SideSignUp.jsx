import { useState } from "react";

import { auth } from "../../contexts/Firebase";

import { FaArrowCircleRight } from "react-icons/fa";

import { useAuth } from "../../Hooks/useAuth";

import { useNavigate } from 'react-router-dom';

import "./SideSignUp.css";

export function SideSignUp() {
    const { novoUsuario } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");

    // Função que efetiva o cadastro de um novo usuário no sistema
    const verificacaoCadastro = () => {
        if(password !== confPassword) {
            alert("senha");
            return;
        }

        const res = novoUsuario(auth, email, password);

        setEmail("");
        setPassword("")
        setConfPassword("")
        fechaTelaSignUp();
        
    }

    // Função que oculta tela de signUp após efetuação de cadastro ou Após usuário realizar comando para fechar container
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
                        placeholder="Digite o seu E-mail"
                        className="campo__input--signup"
                        id="email__signup"
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
                        placeholder="Digite a sua senha"
                        autoComplete="on"
                        className="campo__input--signup"
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
                        placeholder="Confirme a sua senha"
                        autoComplete="on"
                        className="campo__input--signup"
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