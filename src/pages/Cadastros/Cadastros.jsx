import { useRef, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../contexts/Firebase";
import axios from "axios";

import { toast } from "react-toastify";

import "./Cadastros.css"
import { EdicaoCadastro } from "../../components/EdicaoCadastro/EdicaoCadastro";

export function Cadastros() {

    const api = import.meta.env.VITE_API;
    const apiCadastroCategorias = import.meta.env.VITE_API_CATEGORIAS;

    const [userOn] = useAuthState(auth);

    const ref = useRef();
    const refCategoria = useRef();
    console.log(ref);
    console.log(refCategoria);

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

    useEffect(() => {
        getCategoriasRegistradas();
    }, [setCategoriasRegistradas]);

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

    const handleSubmitNovaCategoria = async (e) => {
        e.preventDefault();

        const categoriaNova = refCategoria.current;

        await axios
            .post(apiCadastroCategorias, {
                categoria: categoriaNova.nova__categoria.value,
                criador: userOn.displayName
            })
            .then 
            (
                ({ data }) => toast.success(data)
            )
            .catch
            (
                ({ data }) => toast.error(data)
            )
            categoriaNova.nova__categoria.value = "";
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
                <p>
                    Nome → O Campo "Nome" deve ser preenchido conforme o usuário definir 
                    para ser visializado em toda base de dados na plataforma. 
                    Este nome será a referência no registro de pagamentos e acesso de 
                    qualquer outro dado.
                </p>
                <p>
                    Email → O Campo "E-mail" deve ser preenchido com e-mail para contato 
                    com a pessoa e/ou empresa.
                </p>
                <p>
                    Telefone → O Compo "Telefone" pode ser preenchido com telefone comercial 
                    e/ou Telefone celular para contato.
                </p>
                <p>
                    Categoria → A categoria deve ser selecionada conforme a natureza da 
                    pessoa e/ou empresa que será registro de pagamentos. Esse campo serve 
                    para gerar dados de acompanhamento na página inicial da aplicação.
                </p>
            </article>
            <form className="formulario__cadastro" ref={ref} onSubmit={handleSubmit}>
                <fieldset className="containers__input">
                    <label htmlFor="name">
                        Nome: 
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
                        E-mail: 
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
                        Telefone: 
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
                        Categoria: 
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
                </fieldset>
                <button
                    type="submit"
                    className="botao__cadastro"
                >
                    Cadastrar
                </button>
            </form>
            <article className="lista__cadastrados">
                <h3>Lista de Contribuintes/Fornecedores Cadastrados</h3>
                <form>
                    <select className="teste__opcao">
                        {cadastrados.map((item, i) => (
                            <option key={i}>{item.nome}</option>
                        ))}
                    </select>
                    <button type="button" onClick={defineOpcaoParaEditarOuDeletar}>Selecionar</button>
                </form>
            </article>
            <div className="area__containerEdicao">
                <EdicaoCadastro onEdit={onEdit}
                    setOnEdit={setOnEdit}
                    cadastrados={cadastrados}
                    setCadastrados={setCadastrados}
                    getCadastrados={getCadastrados}
                />
            </div> 
            <article className="container__categorias">
                <h3>Lista de Categorias</h3>
                <form refCategoria={refCategoria} onSubmit={handleSubmitNovaCategoria} className="formulario__categoria">
                    <fieldset>
                        <label htmlFor="nova__categoria">Nova Categoria </label>
                        <input type="text" name="nova__categoria" id="nova__categoria" />
                        <button type="submit">Salvar</button>
                    </fieldset>
                </form>
                <table className="tabela__categorias">
                    <thead className="table__head">
                            <tr>
                                <th className="tipo__categorias">Categoria</th>
                                <th className="tipo__criadoPor">Criado por:</th>
                            </tr>
                    </thead>
                    <tbody className="table__body">      
                        {categoriasRegistradas.map((item, i) => (
                            <tr key={i}>
                                <td className="item__categoria">{item.categoria}</td>
                                <td className="item__criador">{item.criador}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </article>
        </section>
    );
};