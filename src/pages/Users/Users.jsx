import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../contexts/Firebase";

//Componentes de Estilização
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { AiOutlineSetting } from "react-icons/ai";
import { toast } from "react-toastify";

export function Users() {

    const modalSaveChanges = document.querySelector(".editModal");
    const modalDelete = document.querySelector(".deleteModal");

    // Keys to access API - Names/Companies Registration and Categories Registration
    const api = import.meta.env.VITE_API;
    const apiAllCategories = import.meta.env.VITE_API_CATEGORIAS;
    const apiCallingCodes = import.meta.env.VITE_API_CALLINGCODES;

    // State about user being logged in (Firebase Auth)
    const [userOn] = useAuthState(auth);

    // Reference to get data values to create/update/delete informations in API
    const ref = useRef();

    // State to Data Registrated
    const [allUsers, setAllUsers] = useState([]);
    const [databaseInfo, setDatabaseInfo] = useState("");
    const [countreyCodes, setCountryCodes] = useState([]);
    const [allCategories, setAllCategories] = useState([]);

    // API call to get All data registrated by Name/Company
    const getAllUsers = async () => {
        try {
            const res = await axios.get(api);
            const allUsersList = res.data.sort((a,b) => (a.name > b.name ? 1 : -1));
            setAllUsers(allUsersList.filter((list) => list.user===userOn.uid));
        } catch (error) {
            toast.error(error);
        }
    };

    // API call to get All data registrated for categories
    const getAllCategories = async () => {
        try {
            const res = await axios.get(apiAllCategories);
            const categoriesByUser = res.data.sort((a,b) => (a.category > b.category ? 1 : -1));
            setAllCategories(categoriesByUser);
        } catch (error) {
            toast.error(error);
        }
    }

    const getCallingCodes = async () => {
        try {
            const res = await axios.get(apiCallingCodes);
            const allCallingCodes = res.data.sort((a,b) => (a.code > b.code ? 1 : -1));
            const arrayOfCodes = [];
            for(let i=0; i < allCallingCodes.length; i++) {
                arrayOfCodes.push(allCallingCodes[i].code);
            }
            const deleteDoubleCode = [...new Set(arrayOfCodes)];
            setCountryCodes(deleteDoubleCode);
        } catch (error) {
            toast.error(error);
        }
    }   

    // Submit information to API
    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentUser = ref.current;

        await axios
            .post(api, {
                name: currentUser.name.value,
                email: currentUser.email.value,
                phone: currentUser.phone.value,
                category: currentUser.category.value,
                user: userOn.uid
            })
            .then (({ data }) => toast.success(data))
            .catch (({ data }) => toast.error(data))

        currentUser.name.value = "";
        currentUser.email.value = "";
        currentUser.phone.value = "";
        currentUser.category.value = "";
        getAllUsers();
    }

    const handleEdit = async (params) => {
        closeModal();
        const allOptionsButtons = document.querySelectorAll(".dropdown-menu");
        const inputsToEdit = document.querySelectorAll(".item"+params.id);
        inputsToEdit.forEach(elemento => elemento.disabled=true);
        const saveUpdateButton = document.querySelector(".saveEdit" + (params.id));
        saveUpdateButton.classList.add("d-none");
        const dropdownButtonOptions = document.querySelector(".onEdit" + (params.id));
        dropdownButtonOptions.classList.remove("d-none");
        allOptionsButtons.forEach(button => button.classList.remove("show"));

        await axios
            .put(api + params.id, {
                name: document.getElementById("name"+params.id).value,
                email: document.getElementById("email"+params.id).value,
                phone: document.getElementById("phone"+params.id).value,
                category: params.category,
                user: params.user
            })
            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data))
    }

    const handleDelete = async (params) => {
        closeModal();
        await axios
            .delete(api + params.id)
            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data))
        getAllUsers();
    }

    useEffect(() => {
        getAllUsers();
    }, [setAllUsers]);

    useEffect(() => {
        getCallingCodes();
    }, [setAllUsers]);

    useEffect(() => {
        getAllCategories();
    }, [allCategories]);

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
        const allOptionsButtons = document.querySelectorAll(".dropdown-menu");
        allOptionsButtons.forEach(button => {
            button.classList.remove("show");
        })
    }

    return (
        <section>
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
                <form ref={ref} onSubmit={handleSubmit} className="row g-3 form-input" >
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="form-control"
                            required
                            placeholder="Type full name or Company name"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">E-mail</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            placeholder="test@test.com"
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <div className="input-group has-validation" >
                            <select style={{width:"60px"}}>
                                <option></option>
                                {countreyCodes.map((item, i) => (
                                        <option className="dropdown-item" key={i}>+{item}</option>
                                ))}
                            </select>
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                required
                                placeholder="00 00000 0000"
                                pattern="[0-9]{2} [0-9]{5} [0-9]{4}"
                                className="form-control"
                            />
                            <div className="invalid-feedback">
                                Please, check format number!
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Category</label>
                        <select className="form-select" id="category" aria-label="Default select example">
                            {allCategories.map((item, i) => (
                                <option key={i}>{item.category}</option>
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
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Category</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {allUsers.length > 0 && allUsers.map((userDb, i) => 
                            <tr key={i}>
                                <td>
                                    <input
                                        type="text"
                                        name="nameEdit"
                                        id={"name"+(userDb.id)}
                                        className={"form-control" + " item" + (userDb.id)}
                                        disabled
                                        defaultValue={userDb.name}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="email"
                                        name="emailEdit"
                                        id={"email"+(userDb.id)}
                                        className={"form-control" + " item" + (userDb.id)}
                                        disabled
                                        defaultValue={userDb.email}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="phone"
                                        name="phoneEdit"
                                        id={"phone"+(userDb.id)}
                                        className={"form-control" + " item" + (userDb.id)}
                                        disabled
                                        defaultValue={userDb.phone}
                                    />
                                </td>
                                <td>{userDb.category}</td>
                                <td>
                                    <div className={"dropdown dropstart onEdit" + (userDb.id)} >
                                        <button
                                            className="btn btn-secondary dropdown-toggle"
                                            type="button" id="dropdownMenuButton2"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                            onClick={() => dropDownOptions(userDb.id)}
                                        >
                                            <AiOutlineSetting/>
                                        </button>
                                        <ul className={"dropdown-menu dropdown-menu-dark options-edit-delete" + (userDb.id)}
                                            style={{inset:"0px 100% auto auto"}}
                                            aria-labelledby="dropdownMenuButton2"
                                        >
                                            <li className="dropdown-item cursor-pointer" onClick={() => enablesInput(userDb.id)}>Edit</li>
                                            <li className="dropdown-item cursor-pointer" onClick={() => openDeleteModal(userDb)}>Delete</li>
                                        </ul>
                                    </div>
                                    <button type="button"
                                        className={"btn btn-outline-success saveEdit" + (userDb.id) +" d-none"}
                                        onClick={() => (openEditModal(userDb))}
                                    >
                                        Save
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
};