import axios from "axios";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../contexts/Firebase";

import { AiOutlineSetting } from "react-icons/ai";
import { toast } from "react-toastify";

export function History() {

    const modalSaveChanges = document.querySelector(".editModal");
    const modalDelete = document.querySelector(".deleteModal");

    const [userOn] = useAuthState(auth);

    const apiPayments = import.meta.env.VITE_API_PAGAMENTOS;

    const [allPayControl, setAllPayControl] = useState([]);
    const [databaseInfo, setDatabaseInfo] = useState("");
    
    const getAllPayments = async () => {
        try {
            const res = await axios.get(apiPayments);
            const allPaymentsList = res.data.sort((a,b) => (a.date < b.date ? 1 : -1));
            setAllPayControl(allPaymentsList.filter((list) => list.user===userOn.uid));
        } catch (error) {
            toast.error(error);
        }
    }

    useEffect(() => {
        getAllPayments();
    }, [setAllPayControl]);

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

    const handleEdit = async (params) => {
        closeModal();
        const allOptionsButtons = document.querySelectorAll(".dropdown-menu");
        const inputsToEdit = document.querySelectorAll(".item"+params.idpay_control);
        inputsToEdit.forEach(elemento => elemento.disabled=true);
        const saveUpdateButton = document.querySelector(".saveEdit" + (params.idpay_control));
        saveUpdateButton.classList.add("d-none");
        const dropdownButtonOptions = document.querySelector(".onEdit" + (params.idpay_control));
        dropdownButtonOptions.classList.remove("d-none");
        allOptionsButtons.forEach(button => button.classList.remove("show"));

        await axios
            .put(apiPayments + params.idpay_control, {
                name: params.name,
                category: params.category,
                type: params.type,
                value: document.getElementById("value"+params.idpay_control).value,
                obs: document.getElementById("obs"+params.idpay_control).value,
                date: document.getElementById("date"+params.idpay_control).value
            })
            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data));
    }

    const handleDelete = async (params) => {
        closeModal();
        await axios
            .delete(apiPayments + params.idpay_control)
            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data))
        getAllPayments();
        console.log(apiPayments + params.idpay_control)
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
            <h2>History</h2>
            <p>Bellow you can check it out all payments registered on database.</p>
            <div className="d-flex flex-row justify-content-center">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Value</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {allPayControl.length > 0 && allPayControl.map((payment, i) => 
                            <tr key={i}>
                                <td>{payment.name}</td>
                                <td>{payment.category}</td>
                                <td>
                                    <input
                                        type="text"
                                        name="valueEdit"
                                        id={"value"+(payment.idpay_control)}
                                        className={"form-control" + " item" + (payment.idpay_control)}
                                        disabled
                                        defaultValue={(payment.value).toFixed(2)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="obsEdit"
                                        id={"obs"+(payment.idpay_control)}
                                        className={"form-control" + " item" + (payment.idpay_control)}
                                        disabled
                                        defaultValue={payment.obs}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="date"
                                        name="dateEdit"
                                        id={"date"+(payment.idpay_control)}
                                        className={"form-control" + " item" + (payment.idpay_control)}
                                        disabled
                                        defaultValue={payment.date}
                                    />
                                </td>
                                <td>
                                    <div className={"dropdown dropstart onEdit" + (payment.idpay_control)} >
                                        <button
                                            className="btn btn-secondary dropdown-toggle"
                                            type="button" id="dropdownMenuButton2"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                            onClick={() => dropDownOptions(payment.idpay_control)}
                                        >
                                            <AiOutlineSetting/>
                                        </button>
                                        <ul className={"dropdown-menu dropdown-menu-dark options-edit-delete" + (payment.idpay_control)}
                                            aria-labelledby="dropdownMenuButton2"
                                            style={{inset:"0px 100% auto auto"}}
                                        >
                                            <li className="dropdown-item cursor-pointer" onClick={() => enablesInput(payment.idpay_control)}>Edit</li>
                                            <li className="dropdown-item cursor-pointer" onClick={() => openDeleteModal(payment)}>Delete</li>
                                        </ul>
                                    </div>
                                    <button type="button"
                                        className={"btn btn-outline-primary saveEdit" + (payment.idpay_control) +" d-none"}
                                        onClick={() => openEditModal(payment)}
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
}