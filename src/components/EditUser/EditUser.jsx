import { auth } from "../../contexts/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { updateProfile } from "firebase/auth";

import "./EditUser.css"

export function EditUser() {

    const [user] = useAuthState(auth);

    // Função para atualizar dados do usuário no Firebase (Nome)
    const atualizaNomeUsuario = () => {

        let nomeAtualizado = document.getElementById("nome").value;
        console.log(user.displayName);

        updateProfile(user, {
            displayName: nomeAtualizado
        }).then(() => {
            let displayName = user.displayName;
        }, (error) => {
            console.log(error);
        })

        window.location.reload(true);
    }

    return (
        <form className="form__nome edicao__desativada">
            <fieldset className="campo__nome">
                <label htmlFor="nome">
                    Nome
                </label>
                <input
                    type="text"
                    name="nome"
                    className="campo__input"
                    id="nome"
                    required
                />
                <button
                    type="button"
                    className="button__atualizar"
                    onClick={atualizaNomeUsuario}
                >
                    Atualizar
                </button>
            </fieldset>
        </form>
    );
}