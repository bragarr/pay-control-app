import { auth } from "../../contexts/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";

import { FaUserCircle } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";

export function NavBarNotSignedIn() {
    const [user] = useAuthState(auth);
    const menuButton =  document.querySelector(".offcanvas");
    const menuSubPages = document.querySelector(".dropdown-menu");

    const activeDesactiveMenu = () => {
        menuButton.classList.toggle("show");
    }

    const DefineIconeUsuario = () => {
        return user.photoURL===null
        ?
        <FaUserCircle/>
        :
        <img src={user.photoURL} alt="Foto de perfil" height="40px" />
    }

    const DefineFotoUsuario = () => {
        return !user
        ?
        <FaUserCircle/>
        :
        <DefineIconeUsuario />
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to={"/"} className="navbar-brand">PayControl<BsCashCoin /></Link>
                <button 
                    className="navbar-toggler"
                    onClick={activeDesactiveMenu}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>Menu
                </button>
                <div className="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">PayControl</h5>
                        <button type="button" onClick={activeDesactiveMenu} className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to={"/"} className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"signin"} className="nav-link">Sign In</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"signup"} className="nav-link">Sign Up</Link>
                            </li>
                        </ul>
                        <div class="d-flex">
                            <DefineFotoUsuario />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
};