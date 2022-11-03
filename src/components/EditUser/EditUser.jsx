import { auth } from "../../contexts/Firebase";
import { updateProfile } from "firebase/auth";

import "./EditUser.css"

export function EditUser() {
    return (
        <form className="form__nome edicao__desativada">
            <fieldset className="campo__nome">
                <label htmlFor="email">
                    Nome
                </label>
                <input
                    type="text"
                    name="nome"
                    className="campo__input"
                    required
                />
                <button
                    type="button"
                    className="button__atualizar"
                >
                    Atualizar
                </button>
            </fieldset>
        </form>
    );
}