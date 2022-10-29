import { Link } from "react-router-dom";

import "./SideMenu.css";

export function SideMenu() {
    return (
        <nav className="menu__nav">
            <Link to={"/"} className="link__menu">Home</Link>
            <Link to={"/"} className="link__menu">About</Link>
            <Link to={"/"} className="link__menu">Aplicações</Link>
        </nav>
    )
}