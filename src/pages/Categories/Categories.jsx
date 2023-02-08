import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../contexts/Firebase";
import { useRef, useEffect, useState } from "react";

import { toast } from "react-toastify";
import { AiOutlineSetting } from "react-icons/ai";

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
            const categoriasRegistradas = res.data.sort((a,b) => (a.categoria > b.categoria ? 1 : -1));
            setCategoriasRegistradas(categoriasRegistradas);
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
            .then (({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data))

        categoriaNova.nova__categoria.value = "";
    }

    const handleEdit = async (params) => {
        const allOptionsButtons = document.querySelectorAll(".dropdown-menu");
        const inputsToEdit = document.querySelectorAll(".item"+params.idcategorias);
        inputsToEdit.forEach(elemento => elemento.disabled=true);
        const saveUpdateButton = document.querySelector(".saveEdit" + (params.idcategorias));
        saveUpdateButton.classList.add("d-none");
        const dropdownButtonOptions = document.querySelector(".onEdit" + (params.idcategorias));
        dropdownButtonOptions.classList.remove("d-none");
        allOptionsButtons.forEach(button => button.classList.remove("show"));

        await axios
            .put(apiCadastroCategorias + params.idcategorias, {
                categoria: document.getElementById("categoria"+params.idcategorias).value,
                criador: params.criador
            })
            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data));
    }

    useEffect(() => {
        getCategoriasRegistradas();
    }, [categoriasRegistradas]);

    const handleDeleteCategoria = async (idcategorias) => {
        await axios
            .delete(apiCadastroCategorias + idcategorias)
            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data));
        getCategoriasRegistradas();
    }

    const enablesInput = (params) => {
        const inputsToEdit = document.querySelectorAll(".item"+params);
        inputsToEdit.forEach(elemento => elemento.disabled=false);
        const dropdownButtonOptions = document.querySelector(".onEdit" + (params));
        dropdownButtonOptions.classList.add("d-none");
        const saveUpdateButton = document.querySelector(".saveEdit" + (params));
        saveUpdateButton.classList.remove("d-none");
    }

    const dropDownOptions = (params) => {
        const allOptionsButtons = document.querySelectorAll(".dropdown-menu");
        const buttonDropDownOptionEditDelete = document.querySelector(".options-edit-delete" + (params));
        allOptionsButtons.forEach(button => {
            if(button.classList.contains("options-edit-delete" + (params))) {
                return "Do not remove show"
            } else {
                button.classList.remove("show");
            }
        })
        buttonDropDownOptionEditDelete.classList.toggle("show");
    }

    return (
        <article>
            <h3>Categories</h3>
            <div>  
                <form ref={ref} onSubmit={handleSubmitNovaCategoria} className="row g-3 align-items-center">
                    <div className="col-12">
                        <label htmlFor="nova__categoria" className="form-label">New Category</label>
                        <input type="text" name="nova__categoria" id="nova__categoria" placeholder="Add new category..." className="form-control" />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
                <table className="table">
                    <thead>
                            <tr>
                                <th>Category</th>
                                <th>User:</th>
                                <th className="text-center"></th>
                            </tr>
                    </thead>
                    <tbody>      
                        {categoriasRegistradas.map((item, i) => (
                            <tr key={i}>
                                <td>
                                    <input
                                        type="text"
                                        name="nameEdit"
                                        id={"categoria"+(item.idcategorias)}
                                        className={"form-control" + " item" + (item.idcategorias)}
                                        disabled defaultValue={item.categoria}
                                    />
                                </td>
                                <td>{item.criador}</td>
                                <td>
                                    <div className={"dropdown onEdit" + (item.idcategorias)} >
                                        <button
                                            className="btn btn-secondary dropdown-toggle"
                                            type="button" id="dropdownMenuButton2"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                            onClick={() => dropDownOptions(item.idcategorias)}
                                        >
                                            <AiOutlineSetting/>
                                        </button>
                                        <ul className={"dropdown-menu dropdown-menu-dark options-edit-delete" + (item.idcategorias)}
                                            aria-labelledby="dropdownMenuButton2"
                                        >
                                            <li className="dropdown-item cursor-pointer" onClick={() => enablesInput(item.idcategorias)}>Edit</li>
                                            <li className="dropdown-item cursor-pointer" onClick={() => handleDeleteCategoria(item.idcategorias)}>Delete</li>
                                        </ul>
                                    </div>
                                    <button type="button"
                                        className={"btn btn-outline-primary saveEdit" + (item.idcategorias) +" d-none"}
                                        onClick={() => handleEdit(item)}
                                    >
                                        Save
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </article>
    );
};