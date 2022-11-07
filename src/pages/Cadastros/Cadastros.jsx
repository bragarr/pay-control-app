import "./Cadastros.css"

export function Cadastros() {

    return (
        <section>
            <h2 className="titulo__cadastro">Tela de cadastros</h2>
            <form className="formulario__cadastro">
                <fieldset>
                    <label htmlFor="name">
                        <figure>
                            Nome
                        </figure>
                        <input type="text" name="nome"
                            id="name"
                            required
                        />
                    </label>
                    <label htmlFor="email">
                        <figure>
                            E-mail
                        </figure>
                        <input type="email" name="email"
                            id="email"
                            required
                        />
                    </label>
                    <label htmlFor="phone">
                        <figure>
                            Telefone
                        </figure>
                        <input type="tel" name="fone"
                            id="phone"
                            required
                        />
                    </label>
                    <label htmlFor="name" className="label__inputs">
                        <figure>
                            Valor
                        </figure>
                        <input type="text" name="tag"
                            id="name"
                            required
                        />
                    </label>
                </fieldset>
                <button type="submit">
                    Cadastrar
                </button>
            </form>
        </section>
    );
};