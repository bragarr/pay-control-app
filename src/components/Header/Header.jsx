import { auth } from "../../contexts/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { GiHamburgerMenu } from "react-icons/gi";
import { BsCashCoin } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";

export function Header() {

    const [user] = useAuthState(auth);

    // Define container completo de foto + nome do usuário cadastrado
    const DefineIconeUsuario = () => {
        return user.photoURL===null
        ?
        <FaUserCircle/>
        :
        <img src={user.photoURL} alt="Foto de perfil" class="img-fluid img-thumbnail" width="70px" height="auto"/>
    }

    // Define se exibe uma foto de perfil genérica ou foto já definida pelo usuários
    const DefineFotoUsuario = () => {
        return !user
        ?
        <FaUserCircle/>
        :
        <DefineIconeUsuario />
    }

    return (
        <header>
            <GiHamburgerMenu />
            <figure>
                <h1>PayControl<BsCashCoin /></h1>
            </figure>
        </header>
    )
}