import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../contexts/Firebase";
import { EdicaoCadastro } from "../../components/EdicaoCadastro/EdicaoCadastro";
import { CadastroNovaCategoria } from "../../components/CadastroNovaCategoria/CadastroNovaCategoria";

//Componentes de Estilização
import { toast } from "react-toastify";
import "./Registration.css"



export function Registration() {

    // Keys to access API - Names/Companies Registration and Categories Registration
    const api = import.meta.env.VITE_API;
    const apiCadastroCategorias = import.meta.env.VITE_API_CATEGORIAS;

    // State about user being logged in (Firebase Auth)
    const [userOn] = useAuthState(auth);

    // Reference to get data values to create/update/delete informations in API
    const ref = useRef();


    // State to Data Registrated
    const [cadastrados, setCadastrados] = useState([]);
    const [categoriasRegistradas, setCategoriasRegistradas] = useState([]);
    const [onEdit, setOnEdit] = useState(null);


    // API call to get All data registrated by Name/Company
    const getCadastrados = async () => {
        try {
            const res = await axios.get(api);
            const listaUsuariosCadastrados = res.data.sort((a,b) => (a.nome > b.nome ? 1 : -1));
            setCadastrados(listaUsuariosCadastrados.filter((lista) => lista.usuario===userOn.uid));
        } catch (error) {
            toast.error(error);
        }
    };

    // API call to get All data registrated for categories
    const getCategoriasRegistradas = async () => {
        try {
            const res = await axios.get(apiCadastroCategorias);
            const categoriasRegistradasPorTodosOsUsuariosDaPlataforma = res.data.sort((a,b) => (a.categoria > b.categoria ? 1 : -1));
            setCategoriasRegistradas(categoriasRegistradasPorTodosOsUsuariosDaPlataforma);
        } catch (error) {
            toast.error(error);
        }
    }

    // Submit information to API
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

    // Modifies Style to make visible container to edit or delete Name/Company registered
    const defineOpcaoParaEditarOuDeletar = () => {
        setOnEdit(cadastrados.filter((item) => item.nome===(document.querySelector(".teste__opcao").value)));
        document.querySelector(".container__edicao").classList.add("exibe__containerEdicao")
    }

    useEffect(() => {
        getCadastrados();
    }, [setCadastrados])

    return (
        <section className="pagina__cadastros">
            <article className="apresentacao__cadastro">
                <h2 className="titulo__cadastro">Registration</h2>
                <p>
                    Here you can make registration by name/company so you can create
                    an organized cash flow.
                </p>
                <p>
                    Bellow you can see the form to submit information to registration.
                </p>
            </article>
            <div className="divisao__containersCadastro">
                <form className="formulario__cadastro" ref={ref} onSubmit={handleSubmit}>
                    <fieldset className="containers__input">
                        <label htmlFor="name">
                            Name 
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
                            Phone 
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
                            Category 
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
                            Save
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
                <h3>Name/Companies on Database</h3>
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