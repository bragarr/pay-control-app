import { auth } from "../../contexts/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";

import { FaUserCircle } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";

export function NavBar() {
    const [user] = useAuthState(auth);
    const menuButton =  document.querySelector(".offcanvas");
    const menuSubPages = document.querySelector(".dropdown-menu");

    const activeDesactiveMenu = () => {
        menuButton.classList.toggle("show");
    }

    const subPages = () => {
        menuSubPages.classList.toggle("show");
    }

    const DefineIconeUsuario = () => {
        return user.photoURL===null
        ?
        <FaUserCircle/>
        :
        <img src={user.photoURL} alt="Foto de perfil" className="img-fluid img-thumbnail" width="50px"/>
    }

    const DefineFotoUsuario = () => {
        return !user
        ?
        <FaUserCircle/>
        :
        <DefineIconeUsuario />
    }

    return (
        <nav className="navbar navbar-expand{-sm|-md|-lg|-xl|-xxl} navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to={"/"} className="navbar-brand">PayControl<BsCashCoin /></Link>
                <button className="navbar-toggler" type="button" onClick={activeDesactiveMenu} data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">PayControl</h5>
                        <button type="button" onClick={activeDesactiveMenu} className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item">
                                <Link to={"/"} className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"access"} className="nav-link">Profile</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" onClick={subPages} data-bs-toggle="dropdown" aria-expanded="false">
                                    Data Inputs
                                </a>
                                <ul className="dropdown-menu dropdown-menu-dark">
                                    <li><Link to={"registration"} className="nav-link">Users</Link></li>
                                    <li><Link to={"cashflow"} className="nav-link">Cash Flow</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link to={"history"} className="nav-link">History</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
};



