import { useRef, useState, useEffect } from "react";
import axios from "axios";

import { toast, ToastContainer } from "react-toastify";

import "./Cadastros.css"

export function Cadastros() {

    const ref = useRef();    

    const [users, setUsers] = useState([]);
    const [onEdit, setOnEdit] = useState(null);

    const getUsers = async () => {
        try {
            const res = await axios.get("https://controle-pagamentos-backend.herokuapp.com/");
            setUsers(res.data.sort((a,b) => (a.nome > b.nome ? 1 : -1)));
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
            user.valor.value = onEdit.valor;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = ref.current;
        
        if(onEdit) {
            await axios
                .put("https://controle-pagamentos-backend.herokuapp.com/" + onEdit.id, {
                    nome: user.nome.value,
                    email: user.email.value,
                    fone: user.fone.value,
                    valor: user.valor.value,
                })

                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        } else {
            await axios
                .post("https://controle-pagamentos-backend.herokuapp.com/", {
                    nome: user.nome.value,
                    email: user.email.value,
                    fone: user.fone.value,
                    valor: user.valor.value,
                })
                .then (({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data))
        }

        user.nome.value = "";
        user.email.value = "";
        user.fone.value = "";
        user.valor.value = "";

        setOnEdit(null);
        getUsers();
    }

    return (
        <section>
            <h2 className="titulo__cadastro">Tela de cadastros</h2>
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
                    <label htmlFor="name">
                        Valor: 
                    </label>
                    <input
                        type="text"
                        name="valor"
                        id="valor"
                        required
                        className="input__cadastros"
                    />
                </fieldset>
                <button
                    type="submit"
                    className="botao__cadastro"
                >
                    Cadastrar
                </button>
            </form>
            <ToastContainer />
        </section>
    );
};