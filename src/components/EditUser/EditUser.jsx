import { auth } from "../../contexts/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { updateProfile } from "firebase/auth";

import "./EditUser.css"
import { useState } from "react";

export function EditUser() {

    const [user] = useAuthState(auth);

    const [nomeUsuario, setNomeUsuario] = useState([]); 

    // Função para atualizar dados do usuário no Firebase (Nome)
    const atualizaNomeUsuario = () => {
        updateProfile(user, {
            displayName: nomeAtualizado
        }).then(() => {
            let displayName = user.displayName;
        }, (error) => {
            console.log(error);
        })

        let nomeAtualizado = document.getElementById("nome").value;

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