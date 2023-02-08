import { useState } from "react";
import { auth } from "../../contexts/Firebase";
import { useAuth } from "../../Hooks/useAuth";
import { Link, useNavigate } from 'react-router-dom';

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
                <p>Fill up all the fields.</p>
                <div class="mb-3">
                    <label htmlFor="email" class="form-label">E-mail</label>
                    <input 
                        type="email"
                        name="email"
                        placeholder="Type your E-mail"
                        id="email__signup"
                        value={email}
                        onChange={(e) => [setEmail(e.target.value)]}
                        class="form-control"
                        required
                    />
                </div>
                <div class="mb-3">
                    <label htmlFor="password" class="form-label">Password</label>
                    <input 
                        type="password"
                        name="password"
                        placeholder="Type your password"
                        autoComplete="on"
                        id="password"
                        value={password}
                        onChange={(e) => [setPassword(e.target.value)]}
                        class="form-control"
                        required
                    />
                </div>
                <div class="mb-3">
                    <label htmlFor="confirmar__password" class="form-label">Confirm your password</label>
                    <input
                        type="password"
                        name="confirmar__password"
                        placeholder="Confirm your password"
                        autoComplete="on"
                        id="confirmar__password"
                        value={confPassword}
                        onChange={(e) => [setConfPassword(e.target.value)]}
                        class="form-control"
                        required
                    />
                </div>
                <div class="mb-3">
                    <button type="button" onClick={verificacaoCadastro} class="btn btn-outline-primary">Enter</button>
                    <p>Already have an account? <Link to={"/signin"}>Sign in</Link></p>
                </div>
            </form>
        </article>
    )
}