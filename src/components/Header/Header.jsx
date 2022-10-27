import { Link } from "react-router-dom"

import { GiReceiveMoney, GiHamburgerMenu, GiCancel } from "react-icons/gi"
import { FaUserCircle } from "react-icons/fa"

import "./Header.css"

export function Header() {

    const exibeMenuLateral = () => {
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
            <nav className="menu__nav">
                <Link to={"/"}>Home</Link>
            </nav>
            <FaUserCircle className="icones__nav"/>
        </header>
    )
}