import axios from "axios";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../contexts/Firebase";

import { AiOutlineSetting } from "react-icons/ai";
import { toast } from "react-toastify";

export function History() {

    const [userOn] = useAuthState(auth);

    const apiPagamentosRegistrados = import.meta.env.VITE_API_PAGAMENTOS;

    const [pagamentosRegistrados, setPagamentosRegistrados] = useState([]);
    
    const getPagamentosRegistrados = async () => {
        try {
            const res = await axios.get(apiPagamentosRegistrados);
            const listaPagamentosRegistrados = res.data.sort((a,b) => (a.data_pagamento < b.data_pagamento ? 1 : -1));
            setPagamentosRegistrados(listaPagamentosRegistrados.filter((lista) => lista.usuario===userOn.uid));
        } catch (error) {
            toast.error(error);
        }
    }

    useEffect(() => {
        getPagamentosRegistrados();
    }, [setPagamentosRegistrados]);

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
        const allOptionsButtons = document.querySelectorAll(".dropdown-menu");
        const inputsToEdit = document.querySelectorAll(".item"+params.idfluxo_caixa);
        inputsToEdit.forEach(elemento => elemento.disabled=true);
        const saveUpdateButton = document.querySelector(".saveEdit" + (params.idfluxo_caixa));
        saveUpdateButton.classList.add("d-none");
        const dropdownButtonOptions = document.querySelector(".onEdit" + (params.idfluxo_caixa));
        dropdownButtonOptions.classList.remove("d-none");
        allOptionsButtons.forEach(button => button.classList.remove("show"));

        await axios
            .put(apiPagamentosRegistrados + params.idfluxo_caixa, {
                nome: params.nome,
                tipo_pagamento: params.tipo_pagamento,
                valor_pagamento: document.getElementById("value"+params.idfluxo_caixa).value,
                obs: document.getElementById("obs"+params.idfluxo_caixa).value,
                data_pagamento: document.getElementById("date"+params.idfluxo_caixa).value
            })
            .then(({ data }) => (data))
            .catch(({ data }) => toast.error(data));
    }

    const handleDelete = async (params) => {
        await axios
            .delete(apiPagamentosRegistrados + params.idfluxo_caixa)
            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data))
        getPagamentosRegistrados();
    }

    return (
        <section>
            <h2>History</h2>
            <p>Bellow you can check it out all payments registered on database.</p>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Value</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {pagamentosRegistrados.length > 0 && pagamentosRegistrados.map((pagamento, i) => 
                        <tr key={i}>
                            <td>{pagamento.nome}</td>
                            <td>
                                <input
                                    type="text"
                                    name="valueEdit"
                                    id={"value"+(pagamento.idfluxo_caixa)}
                                    className={"form-control" + " item" + (pagamento.idfluxo_caixa)}
                                    disabled
                                    defaultValue={(pagamento.valor_pagamento).toFixed(2)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="obsEdit"
                                    id={"obs"+(pagamento.idfluxo_caixa)}
                                    className={"form-control" + " item" + (pagamento.idfluxo_caixa)}
                                    disabled
                                    defaultValue={pagamento.obs}
                                />
                            </td>
                            <td>
                                <input
                                    type="date"
                                    name="dateEdit"
                                    id={"date"+(pagamento.idfluxo_caixa)}
                                    className={"form-control" + " item" + (pagamento.idfluxo_caixa)}
                                    disabled
                                    defaultValue={pagamento.data_pagamento}
                                />
                            </td>
                            <td className="text-center">
                                    <div className={"dropdown onEdit" + (pagamento.idfluxo_caixa)} >
                                        <button
                                            className="btn btn-secondary dropdown-toggle"
                                            type="button" id="dropdownMenuButton2"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                            onClick={() => dropDownOptions(pagamento.idfluxo_caixa)}
                                        >
                                            <AiOutlineSetting/>
                                        </button>
                                        <ul className={"dropdown-menu dropdown-menu-dark options-edit-delete" + (pagamento.idfluxo_caixa)}
                                            aria-labelledby="dropdownMenuButton2"
                                        >
                                            <li className="dropdown-item cursor-pointer" onClick={() => enablesInput(pagamento.idfluxo_caixa)}>Edit</li>
                                            <li className="dropdown-item cursor-pointer" onClick={() => handleDelete(pagamento)}>Delete</li>
                                        </ul>
                                    </div>
                                    <button type="button"
                                        className={"btn btn-outline-primary saveEdit" + (pagamento.idfluxo_caixa) +" d-none"}
                                        onClick={() => handleEdit(pagamento)}
                                    >
                                        Save
                                    </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    );
}