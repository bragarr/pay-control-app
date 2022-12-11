import { useRef, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../contexts/Firebase";
import axios from "axios";

import { toast } from "react-toastify";

import "./Cadastros.css"

export function Cadastros() {

    const api = import.meta.env.VITE_API;

    const [userOn] = useAuthState(auth);

    const ref = useRef();    

    const [users, setUsers] = useState([]);
    const [onEdit, setOnEdit] = useState(null);

    const getUsers = async () => {
        try {
            const res = await axios.get(api);
            const listaUsuariosCadastrados = res.data.sort((a,b) => (a.nome > b.nome ? 1 : -1));
            setUsers(listaUsuariosCadastrados.filter((lista) => lista.usuario===userOn.uid));
        } catch (error) {
            toast.error(error);
        }
    };

    useEffect(() => {
        getUsers();
    }, [setUsers])

    useEffect(() => {
        if(onEdit) {
            const user = ref.current;

            user.nome.value = onEdit.nome;
            user.email.value = onEdit.email;
            user.fone.value = onEdit.fone;
            user.categoria.value = onEdit.categoria;
            user.usuario.value = userOn.displayName;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = ref.current;
        
        if(onEdit) {
            await axios
                .put(api + onEdit.id, {
                    nome: user.nome.value,
                    email: user.email.value,
                    fone: user.fone.value,
                    categoria: user.categoria.value,
                    usuario: userOn.uid
                })

                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        } else {
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
        }

        user.nome.value = "";
        user.email.value = "";
        user.fone.value = "";
        user.categoria.value = "";

        setOnEdit(null);
        getUsers();
    }

    const gerarDadosParaEditarConformeFiltro = () => {
        const opcaoSelecionada = document.querySelector(".teste__opcao");

        const usuarioSelecionado = users.filter((usuarioSelecionado) => usuarioSelecionado.nome===opcaoSelecionada.value);
+
        console.log(usuarioSelecionado);

    }

    return (
        <section>
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
                        name="nome"
                        id="name"
                        required
                        className="input__cadastros"
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
                    />
                    <label htmlFor="categoria">
                        Categoria: 
                    </label>
                    <select
                        name="categoria"
                        id="categoria"
                        className="input__cadastros"
                    >
                        <option
                            className="opcao__selecionada"
                        >
                            Fornecedor
                        </option>
                        <option
                            className="opcao__selecionada"    
                        >
                            Contribuinte
                        </option>
                    </select>
                </fieldset>
                <button
                    type="submit"
                    className="botao__cadastro"
                >
                    Cadastrar
                </button>
            </form>
            <article>
                <select className="teste__opcao">
                    {users.map((item, i) => (
                        <option key={i}>{item.nome}</option>
                    ))}
                </select>
                <button type="button" onClick={gerarDadosParaEditarConformeFiltro}>Selecionar</button>
            </article>
        </section>
    );
};