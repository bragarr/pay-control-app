import { useState } from "react";
import { auth } from "../../contexts/Firebase";
import { useAuth } from "../../Hooks/useAuth";
import { useNavigate } from 'react-router-dom';

export function SignUp() {
    const { novoUsuario } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");

    // Função que efetiva o cadastro de um novo usuário no sistema
    const verificacaoCadastro = () => {
        if(password !== confPassword) {
            alert("senha");
            return;
        }

        const res = novoUsuario(auth, email, password);

        setEmail("");
        setPassword("")
        setConfPassword("")
        fechaTelaSignUp();
        
    }

    return (
        <article>
            <form >
                <h2>Sign Up</h2>
                <p>Preencha todos os campos</p>
                <fieldset>
                    <label htmlFor="email">
                        E-mail
                    </label>
                    <input 
                        type="email"
                        name="email"
                        placeholder="Digite o seu E-mail"
                        id="email__signup"
                        value={email}
                        onChange={(e) => [setEmail(e.target.value)]}
                        required
                    />
                    <label htmlFor="password">
                        Senha
                    </label>
                    <input 
                        type="password"
                        name="password"
                        placeholder="Digite a sua senha"
                        autoComplete="on"
                        id="password"
                        value={password}
                        onChange={(e) => [setPassword(e.target.value)]}
                        required
                    />
                    <label htmlFor="confirmar__password">
                        Confirmar Senha
                    </label>
                    <input
                        type="password"
                        name="confirmar__password"
                        placeholder="Confirme a sua senha"
                        autoComplete="on"
                        id="confirmar__password"
                        value={confPassword}
                        onChange={(e) => [setConfPassword(e.target.value)]}
                        required
                    />
                    <button
                        type="button"
                        onClick={verificacaoCadastro}
                    >
                        Cadastrar
                    </button>
                </fieldset>
            </form>
        </article>
    )
}