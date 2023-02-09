import { auth } from "../../contexts/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";

import { FaUserCircle } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";

export function NavBar() {
    const [user] = useAuthState(auth);
    const menuButton =  document.querySelector(".offcanvas");
    const menuSubPages = document.querySelector(".dropdown-menu");

    const activeSideBar = () => {
        menuButton.classList.toggle("show");
    }

    const hideSideBar = () => {
        menuButton.classList.remove("show");
    }

    const subPages = () => {
        menuSubPages.classList.toggle("show");
    }

    const DefineIconeUsuario = () => {
        return !user || user.photoURL===null
        ?
        <FaUserCircle className="rounded-circle m-1" style={{width:"30px", height:"30px"}} />
        :
        <img src={user.photoURL} alt="Foto de perfil" className="rounded-circle m-1" width="30px" height="30px" />
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to={"/"} className="navbar-brand">PayControl<BsCashCoin /></Link>
                <button 
                    className="navbar-toggler"
                    onClick={activeSideBar}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>Menu
                </button>
                <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">PayControl</h5>
                        <button type="button" onClick={activeSideBar} className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to={"/"} className="nav-link" onClick={hideSideBar}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"profile"} className="nav-link" onClick={hideSideBar}>Profile</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={subPages}>
                                    Data Inputs
                                </a>
                                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdown" >
                                    <li><Link to={"users"} className="dropdown-item" onClick={hideSideBar}>Users</Link></li>
                                    <li><Link to={"categories"} className="dropdown-item" onClick={hideSideBar}>Categories</Link></li>
                                    <li><Link to={"payflow"} className="dropdown-item" onClick={hideSideBar}>PayFlow</Link></li>
                                </ul>
                            </li>
                            <li><Link to={"history"} className="nav-link" onClick={hideSideBar}>History</Link></li>
                        </ul>
                        <div className="d-flex align-items-center">
                            <DefineIconeUsuario />
                            <p className="m-0">{user.displayName}</p>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
};