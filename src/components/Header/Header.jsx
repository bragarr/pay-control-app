import { Link } from "react-router-dom"

import { GiReceiveMoney, GiHamburgerMenu } from "react-icons/gi"
import { FaUserCircle } from "react-icons/fa"

import "./Header.css"

export function Header() {
    return (
        <header className="cabecalho">
            <GiHamburgerMenu className="icones__nav menu_nav"/>
            <figure className="container__logo">
                <h1 className="titulo__cabecalho">Controle de Pagamentos</h1>
                <GiReceiveMoney className="icone__app"/>
            </figure>
            <FaUserCircle className="icones__nav"/>
            <nav className="menu__nav">
                <Link to={"/"}>Home</Link>
            </nav>
        </header>
    )
}