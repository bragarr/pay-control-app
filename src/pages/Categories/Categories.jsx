import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../contexts/Firebase";
import { useRef, useEffect, useState } from "react";

import { toast } from "react-toastify";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

export function Categories() {
    // Keys to access API - Names/Companies Registration and Categories Registration
    const apiCadastroCategorias = import.meta.env.VITE_API_CATEGORIAS;

    // State about user being logged in (Firebase Auth)
    const [userOn] = useAuthState(auth);
    const ref = useRef();

    const [categoriasRegistradas, setCategoriasRegistradas] = useState([]);

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

    const handleSubmitNovaCategoria = async (e) => {
        e.preventDefault();

        const categoriaNova = ref.current;

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

    useEffect(() => {
        getCategoriasRegistradas();
    }, [categoriasRegistradas]);

    const handleDeleteCategoria = async (idcategorias) => {
        await axios
            .delete(apiCadastroCategorias +"/"+ idcategorias)
            .then(({ data }) => {
                toast.success(data);
                getCategoriasRegistradas();
            })

            .catch(({ data }) => toast.error(data));
    }

    return (
        <article>
            <h3>Categories</h3>
            <div>  
                <form ref={ref} onSubmit={handleSubmitNovaCategoria} className="row g-3 align-items-center">
                    <div class="col-12">
                        <label htmlFor="nova__categoria" className="form-label">New Category</label>
                        <input type="text" name="nova__categoria" id="nova__categoria" placeholder="Add new category..." class="form-control" />
                    </div>
                    <div class="col-12">
                        <button type="submit" class="btn btn-primary">Save</button>
                    </div>
                </form>
                <table class="table">
                    <thead>
                            <tr>
                                <th>Category</th>
                                <th>User:</th>
                                <th className="text-center">Editar</th>
                                <th className="text-center">Deletar</th>
                            </tr>
                    </thead>
                    <tbody>      
                        {categoriasRegistradas.map((item, i) => (
                            <tr key={i}>
                                <td><input type="text" name="nameEdit" id="nameEdit" className="form-control" disabled defaultValue={item.categoria}/></td>
                                <td>{item.criador}</td>
                                <td className="text-center"><AiFillEdit className="cursor-pointer"/></td>
                                <td className="text-center"><AiFillDelete className="cursor-pointer" onClick={() => handleDeleteCategoria(item.idcategorias)}/></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </article>
    );
};