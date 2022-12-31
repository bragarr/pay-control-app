import { auth } from "../../contexts/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { Link } from "react-router-dom";

import "./SideMenu.css";

export function SideMenu() {

    const [user] = useAuthState(auth);

    // Parâmetro de definição entre Menu Lateral para novo usuário ou usuário com signin efetuado
    const DefineMenuLateral = () => {
        return !user
        ?
        <nav className="menu__nav">
            <Link to={"/"} className="link__menu" onClick={escondeMenuLateral}>Inicio</Link>
            <p className="link__menu" onClick={exibeLoginLateral}>Login</p>
            <p className="link__menu" onClick={exibeSignUp}>Sign Up</p>
        </nav>
        :
        <nav className="menu__nav">
            <Link to={"/"} className="link__menu" onClick={escondeMenuLateral}>Inicio</Link>
            <p className="link__menu" onClick={exibeLoginLateral}>Perfil</p>
            <Link to={"cadastros"} className="link__menu" onClick={escondeMenuLateral}>Cadastros</Link>
            <Link to={"pagamentos"} className="link__menu" onClick={escondeMenuLateral}>Pagamentos</Link>
            <Link to={"historico"} className="link__menu" onClick={escondeMenuLateral}>Histórico Pagamentos</Link>
        </nav>

    }

    // As duas funções englobadas abaixo definem-se a partir do comando do menu lateral para acessar págians de Login e SignUp
    const exibeLoginLateral = () => {
        const signUpLateral = document.querySelector(".container__up");
        signUpLateral.classList.remove("exibe__up--lateral");
        
        const loginLateral = document.querySelector(".container__login");
        loginLateral.classList.add("exibe__login--lateral");

        const botaoAtivaMenu = document.querySelector(".icone__menu");
        const fechaMenu = document.querySelector(".fecha__menu");

        //Listener para exibir ou alterar o menu
        document.querySelector(".menu__nav").classList.remove("menu__ativado");

        // Condicionais para alterar o ícone de exibir ou esconeder  menu lateral
        botaoAtivaMenu.classList.remove("icone__desativado");
        fechaMenu.classList.add("icone__desativado");
    }

    const exibeSignUp = () => {
        const loginLateral = document.querySelector(".container__login");
        loginLateral.classList.remove("exibe__login--lateral");

        const signUpLateral = document.querySelector(".container__up");
        signUpLateral.classList.add("exibe__up--lateral");

        const botaoAtivaMenu = document.querySelector(".icone__menu");
        const fechaMenu = document.querySelector(".fecha__menu");

        //Listener para exibir ou alterar o menu
        document.querySelector(".menu__nav").classList.remove("menu__ativado");

        // Condicionais para alterar o ícone de exibir ou esconeder  menu lateral
        botaoAtivaMenu.classList.remove("icone__desativado");
        fechaMenu.classList.add("icone__desativado");
    }

    const escondeMenuLateral = () => {
        const botaoAtivaMenu = document.querySelector(".icone__menu");
        const fechaMenu = document.querySelector(".fecha__menu");

        // Condicionais para alterar o ícone de exibir ou esconeder  menu lateral
        document.querySelector(".menu__nav").classList.remove("menu__ativado");
        botaoAtivaMenu.classList.remove("icone__desativado");
        fechaMenu.classList.add("icone__desativado");

    }

    return (
        <DefineMenuLateral />
    )
}