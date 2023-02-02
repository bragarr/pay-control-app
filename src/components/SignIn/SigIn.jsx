import { useState } from "react";
import { auth } from "../../contexts/Firebase";
import { useAuth } from "../../Hooks/useAuth";
import { useNavigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";

export function SignIn() {
    const [user] = useAuthState(auth);
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Efetua comando do Firebase para realizar SignIn do usuário na Aplicação
    const realizarLogin = () => {
        const res = login(auth, email, password);
        setEmail("");
        setPassword("");
        navigate("/");
    }

    return (
        <article>
            <form>
                <div class="mb-3">
                    <label htmlFor="email" class="form-label">E-mail</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => [setEmail(e.target.value)]}
                        required
                        class="form-control"
                    />
                </div>
                <div class="mb-3">
                    <label htmlFor="password" class="form-label">Senha</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Senha"
                        autoComplete="on"
                        value={password}
                        onChange={(e) => [setPassword(e.target.value)]}
                        required
                        class="form-control"
                    />
                </div>
                <div class="mb-3">
                    <button type="button" onClick={realizarLogin} class="btn btn-outline-primary">Sign In</button>
                    <p>Ainda não possui acesso?</p>
                </div>
                <div>
                <button type="button" class="btn btn-primary btn-sm">Sign Up</button>
                </div>
            </form>
        </article>
    )
}