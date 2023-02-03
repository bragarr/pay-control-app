import axios from "axios";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../contexts/Firebase";

import { AiFillDelete, AiFillEdit } from "react-icons/ai";
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

    return (
        <section>
            <h2>History</h2>
            <p>Bellow you can check it out all payments registered on database.</p>
            <table class="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Value</th>
                        <th>Date</th>
                        <th className="text-center">Edit</th>
                        <th className="text-center">Delete</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    {pagamentosRegistrados.length > 0 && pagamentosRegistrados.map((pagamento) => 
                        <tr>
                            <td>{pagamento.nome}</td>
                            <td>R${(pagamento.valor_pagamento).toFixed(2)}</td>
                            <td>{(pagamento.data_pagamento)}</td>
                            <td className="text-center"><AiFillEdit className="cursor-pointer"/></td>
                            <td className="text-center"><AiFillDelete className="cursor-pointer"/></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    );
}