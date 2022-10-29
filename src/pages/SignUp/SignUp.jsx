import "./SignUp.css"

export function SignUp() {
    return (
        <section>
            <article className="presantation__page">
                <h2>Seja bem-vindo!</h2>
                <p>Aqui você irá realizar o seu registro na nossa plataforma!</p>
            </article>
            <form className="form__container">
                <fieldset className="register__field">
                    <label htmlFor="nome" className="label__item">
                        Nome:
                    </label>
                    <input
                        className="items__register"
                        id="nome"
                        type="text"
                        placeholder="Nome"
                        required
                    />
                    <label htmlFor="email" className="label__item">
                        E-mail:
                    </label>
                    <input
                        className="items__register"
                        id="email" 
                        type="email"
                        placeholder="Email"
                        required
                    />
                    <label htmlFor="usuario" className="label__item">
                        Usuário:
                    </label>
                    <input
                        className="items__register"
                        id="usuario"
                        type="text"
                        placeholder="Username"
                        required
                    />
                    <label htmlFor="senha" className="label__item">
                        Senha:
                    </label>
                    <input
                        className="items__register"
                        id="senha"
                        type="password"
                        placeholder="Defina a sua senha"
                        required
                    />
                    <label htmlFor="repeteSenha" className="label__item">
                        Confirmar Senha:
                    </label>
                    <input
                        className="items__register"
                        id="repeteSenha"
                        type="password"
                        placeholder="Confirme a sua senha"
                        required
                    />
                    <button className="button__register">Enviar</button>
                </fieldset>
            </form>
        </section>
    )
}