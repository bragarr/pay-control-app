import { Link } from "react-router-dom";

import "./SideMenu.css";

export function SideMenu() {

    const exibeLoginLateral = () => {
        const signUpLateral = document.querySelector(".container__up");
        signUpLateral.classList.remove("exibe__up--lateral");
        
        const loginLateral = document.querySelector(".container__login");
        loginLateral.classList.add("exibe__login--lateral");
    }

    const exibeSignUp = () => {
        const loginLateral = document.querySelector(".container__login");
        loginLateral.classList.remove("exibe__login--lateral");

        const signUpLateral = document.querySelector(".container__up");
        signUpLateral.classList.add("exibe__up--lateral");
    }

    return (
        <nav className="menu__nav">
            <Link to={"/"} className="link__menu">Inicio</Link>
            <p className="link__menu" onClick={exibeLoginLateral}>Sign In</p>
            <p className="link__menu" onClick={exibeSignUp}>Sign Up</p>
            <Link to={"cadastros"} className="link__menu">Cadastros</Link>
            <Link to={"pagamentos"} className="link__menu">Pagamentos</Link>
        </nav>
    )
}