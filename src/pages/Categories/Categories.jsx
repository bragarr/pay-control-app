import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../contexts/Firebase";
import { useRef, useEffect, useState } from "react";

import { toast } from "react-toastify";
import { AiOutlineSetting } from "react-icons/ai";

export function Categories() {
    // Keys to access API - Names/Companies Registration and Categories Registration
    const apiAllCategories = import.meta.env.VITE_API_CATEGORIAS;

    const modalSaveChanges = document.querySelector(".editModal");
    const modalDelete = document.querySelector(".deleteModal");

    // State about user being logged in (Firebase Auth)
    const [userOn] = useAuthState(auth);
    const ref = useRef();
    const [allCategories, setAllCategories] = useState([]);
    const [databaseInfo, setDatabaseInfo] = useState("");

    // API call to get All data registrated for categories
    const getAllCategories = async () => {
        try {
            const res = await axios.get(apiAllCategories);
            const allCategories = res.data.sort((a,b) => (a.category > b.category ? 1 : -1));
            setAllCategories(allCategories);
        } catch (error) {
            toast.error(error);
        }
    }

    const handleSubmitCategory = async (e) => {
        e.preventDefault();

        const newCategory = ref.current;

        await axios
            .post(apiAllCategories, {
                category: newCategory.new_category.value,
                createdby: userOn.displayName
            })
            .then (({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data))

        newCategory.new_category.value = "";
    }

    const handleEdit = async (params) => {
        closeModal();
        const allOptionsButtons = document.querySelectorAll(".dropdown-menu");
        const inputsToEdit = document.querySelectorAll(".item"+params.idcategories);
        inputsToEdit.forEach(elemento => elemento.disabled=true);
        const saveUpdateButton = document.querySelector(".saveEdit" + (params.idcategories));
        saveUpdateButton.classList.add("d-none");
        const dropdownButtonOptions = document.querySelector(".onEdit" + (params.idcategories));
        dropdownButtonOptions.classList.remove("d-none");
        allOptionsButtons.forEach(button => button.classList.remove("show"));

        await axios
            .put(apiAllCategories + params.idcategories, {
                category: document.getElementById("category"+params.idcategories).value,
                createdby: params.createdby
            })
            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data));
    }

    useEffect(() => {
        getAllCategories();
    }, [allCategories]);

    const handleDelete = async (idcategories) => {
        closeModal();
        await axios
            .delete(apiAllCategories + idcategories)
            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data));
        getAllCategories();
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

    const openEditModal = (params) => { 
        modalSaveChanges.classList.add("show","d-block");
        setDatabaseInfo(params);
    }

    const openDeleteModal = (params) => { 
        modalDelete.classList.add("show","d-block");
        setDatabaseInfo(params);
    }

    const closeModal = () => {
        modalSaveChanges.classList.remove("show", "d-block");
        modalDelete.classList.remove("show", "d-block");
    }

    return (
        <article>
            <h3>Categories</h3>
            <div>
            <div className="modal fade mt-5 editModal" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Notice</h5>
                    </div>
                    <div className="modal-body">
                        Do you want to keep all changes?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeModal}>Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={() => handleEdit(databaseInfo)}>Save changes</button>
                    </div>
                    </div>
                </div>
            </div>
            <div className="modal fade mt-5 deleteModal" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Warning</h5>
                    </div>
                    <div className="modal-body">
                        Do you want to delete data?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeModal}>Cancel</button>
                        <button type="button" className="btn btn-outline-danger" onClick={() => handleDelete(databaseInfo)}>Delete</button>
                    </div>
                    </div>
                </div>
            </div>
                <form ref={ref} onSubmit={handleSubmitCategory} className="row g-3 align-items-center">
                    <div className="col-12">
                        <label htmlFor="new_category" className="form-label">New Category</label>
                        <input 
                            type="text"
                            name="new_category"
                            id="new_category"
                            placeholder="Add new category..."
                            maxLength="20"
                            className="form-control"
                        />
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
                        {allCategories.map((item, i) => (
                            <tr key={i}>
                                <td>
                                    <input
                                        type="text"
                                        name="nameEdit"
                                        id={"category"+(item.idcategories)}
                                        className={"form-control" + " item" + (item.idcategories)}
                                        disabled defaultValue={item.category}
                                    />
                                </td>
                                <td>{item.createdby}</td>
                                <td>
                                    <div className={"dropdown dropstart onEdit" + (item.idcategories)} >
                                        <button
                                            className="btn btn-secondary dropdown-toggle"
                                            type="button" id="dropdownMenuButton2"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                            onClick={() => dropDownOptions(item.idcategories)}
                                        >
                                            <AiOutlineSetting/>
                                        </button>
                                        <ul className={"dropdown-menu dropdown-menu-dark options-edit-delete" + (item.idcategories)}
                                            aria-labelledby="dropdownMenuButton2"
                                            style={{inset:"0px 100% auto auto"}}
                                        >
                                            <li className="dropdown-item cursor-pointer" onClick={() => enablesInput(item.idcategories)}>Edit</li>
                                            <li className="dropdown-item cursor-pointer" onClick={() => openDeleteModal(item.idcategories)}>Delete</li>
                                        </ul>
                                    </div>
                                    <button type="button"
                                        className={"btn btn-outline-primary saveEdit" + (item.idcategories) +" d-none"}
                                        onClick={() => openEditModal(item)}
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