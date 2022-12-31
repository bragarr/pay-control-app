import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../contexts/Firebase";
import { EdicaoCadastro } from "../../components/EdicaoCadastro/EdicaoCadastro";
import { CadastroNovaCategoria } from "../../components/CadastroNovaCategoria/CadastroNovaCategoria";

//Componentes de Estilização
import { toast } from "react-toastify";
import "./Cadastros.css"



export function Cadastros() {

    const api = import.meta.env.VITE_API;
    const apiCadastroCategorias = import.meta.env.VITE_API_CATEGORIAS;

    const [userOn] = useAuthState(auth);

    const ref = useRef();

    const [cadastrados, setCadastrados] = useState([]);
    const [categoriasRegistradas, setCategoriasRegistradas] = useState([]);
    const [onEdit, setOnEdit] = useState(null);

    const getCadastrados = async () => {
        try {
            const res = await axios.get(api);
            const listaUsuariosCadastrados = res.data.sort((a,b) => (a.nome > b.nome ? 1 : -1));
            setCadastrados(listaUsuariosCadastrados.filter((lista) => lista.usuario===userOn.uid));
        } catch (error) {
            toast.error(error);
        }
    };
    const getCategoriasRegistradas = async () => {
        try {
            const res = await axios.get(apiCadastroCategorias);
            const categoriasRegistradasPorTodosOsUsuariosDaPlataforma = res.data.sort((a,b) => (a.categoria > b.categoria ? 1 : -1));
            setCategoriasRegistradas(categoriasRegistradasPorTodosOsUsuariosDaPlataforma);
        } catch (error) {
            toast.error(error);
        }
    }

    useEffect(() => {
        getCadastrados();
    }, [setCadastrados])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = ref.current;

        await axios
            .post(api, {
                nome: user.nome.value,
                email: user.email.value,
                fone: user.fone.value,
                categoria: user.categoria.value,
                usuario: userOn.uid
            })
            .then 
            (
                ({ data }) => toast.success(data)
            )
            .catch
            (
                ({ data }) => toast.error(data)
            )

        user.nome.value = "";
        user.email.value = "";
        user.fone.value = "";
        user.categoria.value = "";
        getCadastrados();
    }

    const defineOpcaoParaEditarOuDeletar = () => {
        setOnEdit(cadastrados.filter((item) => item.nome===(document.querySelector(".teste__opcao").value)));
        document.querySelector(".container__edicao").classList.add("exibe__containerEdicao")
    }

    return (
        <section className="pagina__cadastros">
            <article className="apresentacao__cadastro">
                <h2 className="titulo__cadastro">Tela de cadastros</h2>
                <p>
                    Aqui você realizará o cadastro de pessoas/empresas para realizar 
                    o registro de pagamentos efetuados na página de registro de pagamentos
                </p>
                <p>
                    Abaixo você pode conferir os campos que devem ser preenchidos
                </p>
            </article>
            <div className="divisao__containersCadastro">
                <form className="formulario__cadastro" ref={ref} onSubmit={handleSubmit}>
                    <fieldset className="containers__input">
                        <label htmlFor="name">
                            Nome 
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="nome"
                            required
                            className="input__cadastros"
                            placeholder="Digite o nome completo"
                        />
                        <label htmlFor="email">
                            E-mail 
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            className="input__cadastros"
                            placeholder="teste@test.com"
                        />
                        <label htmlFor="fone">
                            Telefone 
                        </label>
                        <input
                            type="tel"
                            name="fone"
                            id="fone"
                            required
                            className="input__cadastros"
                            placeholder="(xx)xxxxx-xxxx"
                        />
                        <label htmlFor="categoria">
                            Categoria 
                        </label>
                        <select
                            name="categoria"
                            id="categoria"
                            className="input__cadastros"
                        >
                            {categoriasRegistradas.map((item, i) => (
                                <option key={i}>{item.categoria}</option>
                            ))}
                        </select>
                        <button
                        type="submit"
                        className="botao__cadastro"
                        >
                            Cadastrar
                        </button>
                    </fieldset>
                </form>
                <div className="area__containerEdicao">
                    <EdicaoCadastro
                        onEdit={onEdit}
                        setOnEdit={setOnEdit}
                        getCadastrados={getCadastrados}
                        categoriasRegistradas={categoriasRegistradas}
                        setCategoriasRegistradas={setCategoriasRegistradas}
                        getCategoriasRegistradas={getCategoriasRegistradas}
                    />
                </div>
                <CadastroNovaCategoria
                    apiCadastroCategorias={apiCadastroCategorias}
                    userOn={userOn}
                    categoriasRegistradas={categoriasRegistradas}
                    setCategoriasRegistradas={setCategoriasRegistradas}
                    getCategoriasRegistradas={getCategoriasRegistradas}
                />
            </div>
            <article className="lista__cadastrados">
                <h3>Lista de Registrados</h3>
                <form className="lista__registrados">
                    <select className="teste__opcao">
                        {cadastrados.map((item, i) => (
                            <option key={i}>{item.nome}</option>
                        ))}
                    </select>
                    <button type="button" onClick={defineOpcaoParaEditarOuDeletar}>Selecionar</button>
                </form> 
            </article>
        </section>
    );
};