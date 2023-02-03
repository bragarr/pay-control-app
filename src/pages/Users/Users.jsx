import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../contexts/Firebase";

//Componentes de Estilização
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { toast } from "react-toastify";

export function Users() {

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

    useEffect(() => {
        getCategoriasRegistradas();
    }, [categoriasRegistradas]);

    return (
        <section>
            <article>
                <h2>Input <IoIosArrowDroprightCircle /> Users</h2>
                <p>
                    Here you can make registration by name/company so you can create
                    an organized cash flow.
                </p>
                <p>
                    Bellow you can see the form to submit information to registration.
                </p>
            </article>
            <div>
                <form ref={ref} onSubmit={handleSubmit} className="row g-3">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="nome"
                            className="form-control"
                            required
                            placeholder="Digite o nome completo"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">E-mail</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            placeholder="teste@test.com"
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="fone" className="form-label">Phone</label>
                        <input
                            type="tel"
                            name="fone"
                            id="fone"
                            required
                            placeholder="(xx)xxxxx-xxxx"
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="categoria" className="form-label">Category</label>
                        <select className="categoria" id="categoria" class="form-select" aria-label="Default select example">
                            {categoriasRegistradas.map((item, i) => (
                                <option key={i}>{item.categoria}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-outline-success">Save</button>
                    </div>
                </form>
            </div>
            <h3 className="mt-3">Name | Companies</h3>
            <div className="d-flex flex-row justify-content-center">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>E-mail</th>
                            <th>Phone</th>
                            <th>Category</th>
                            <th className="text-center">Edit</th>
                            <th className="text-center">Delete</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        {cadastrados.length > 0 && cadastrados.map((registro) => 
                            <tr>
                                <td><input type="text" name="nameEdit" id="nameEdit" className="form-control" disabled defaultValue={registro.nome}/></td>
                                <td><input type="email" name="emailEdit" id="emailEdit" className="form-control" disabled defaultValue={registro.email}/></td>
                                <td><input type="phone" name="phoneEdit" id="phoneEdit" className="form-control" disabled defaultValue={registro.fone}/></td>
                                <td>{registro.categoria}</td>
                                <td className="text-center"><button type="button" class="btn btn-primary">Edit</button></td>
                                <td className="text-center"><AiFillDelete className="cursor-pointer"/></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
};