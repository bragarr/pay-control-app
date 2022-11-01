import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { useState } from "react";

import { useAuth } from "../../Hooks/useAuth";

import { toast, ToastContainer } from "react-toastify";

import { FaArrowCircleRight } from "react-icons/fa";

import "./FastSignUp.css";

export function FastSignUp() {
    const firebaseConfig = {
        apiKey: import.meta.env.VITE_API_KEY,
        authDomain: import.meta.env.VITE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_APP_ID
    };

    const app = initializeApp(firebaseConfig);

    const { novoUsuario } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");

    const verificacaoCadastro = () => {
        if(password !== confPassword) {
            alert("test");
            console.log(confPassword)
            return;
        }
        const auth = getAuth(app);
        const res = novoUsuario(auth, email, password);
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
                    <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER}/>
                </fieldset>
            </form>
        </article>
    )
}