import { auth } from "../../contexts/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { GiReceiveMoney, GiHamburgerMenu, GiCancel } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";

import "./Header.css";

export function Header() {

    const [user] = useAuthState(auth);

    // Define container completo de foto + nome do usuário cadastrado
    const DefineIconeUsuario = () => {
        return user.photoURL===null
        ?
        <FaUserCircle
            className="icones__nav"
            onClick={exibeLoginLateral}
        />
        :
        <img
            src={user.photoURL}
            alt="Foto de perfil"
            className="foto__perfil--cabecalho"
            onClick={exibeLoginLateral}
        />
    }

    // Define se exibe uma foto de perfil genérica ou foto já definida pelo usuários
    const DefineFotoUsuario = () => {
        return !user
        ?
        <FaUserCircle className="icones__nav" onClick={exibeLoginLateral}/>
        :
        <DefineIconeUsuario />
    }

    // Todas as condições para exibir o login lateral em versão mobile ou desktop
    const exibeLoginLateral = () => {
        const signUpLateral = document.querySelector(".container__up");
        signUpLateral.classList.remove("exibe__up--lateral");
        const loginLateral = document.querySelector(".container__login");
        loginLateral.classList.toggle("exibe__login--lateral");

        const botaoAtivaMenu = document.querySelector(".icone__menu");
        const fechaMenu = document.querySelector(".fecha__menu");

        //Listener para exibir ou alterar o menu
        document.querySelector(".menu__nav").classList.remove("menu__ativado");

        // Condicionais para alterar o ícone de exibir ou esconeder  menu lateral
        botaoAtivaMenu.classList.remove("icone__desativado");
        fechaMenu.classList.add("icone__desativado");
    }

    // Função para exibir menu lateral em versão mobile
    const exibeMenuLateral = () => {

        const signUpLateral = document.querySelector(".container__up");
        const loginLateral = document.querySelector(".container__login");
        signUpLateral.classList.remove("exibe__up--lateral");
        loginLateral.classList.remove("exibe__login--lateral");

        const botaoAtivaMenu = document.querySelector(".icone__menu");
        const fechaMenu = document.querySelector(".fecha__menu");

        //Listener para exibir ou alterar o menu
        document.querySelector(".menu__nav").classList.toggle("menu__ativado");

        // Condicionais para alterar o ícone de exibir ou esconeder  menu lateral
        botaoAtivaMenu.classList.toggle("icone__desativado");
        fechaMenu.classList.toggle("icone__desativado");
    }

    return (
        <header className="cabecalho">
            <GiHamburgerMenu className="icones__nav icone__menu" onClick={exibeMenuLateral}/>
            <GiCancel className="icones__nav fecha__menu icone__desativado" onClick={exibeMenuLateral}/>
            <figure className="container__logo">
                <h1 className="titulo__cabecalho">Controle de Pagamentos</h1>
                <GiReceiveMoney className="icone__app"/>
            </figure>
            <DefineFotoUsuario />
        </header>
    )
}