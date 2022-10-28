import { Link } from "react-router-dom";

import "./SideMenu.css";

export function SideMenu() {
    return (
        <nav className="menu__nav">
            <Link to={"/"}>Home</Link>
        </nav>
    )
}