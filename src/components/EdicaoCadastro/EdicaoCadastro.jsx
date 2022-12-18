import { useState, useEffect, useRef } from "react";

import axios from "axios";

import { toast } from "react-toastify";

import "./EdicaoCadastro.css";

export function EdicaoCadastro({onEdit, setOnEdit}) {
    const api= import.meta.env.VITE_API;

    const ref = useRef();
    
    const handleDelete = async (id) => {
        await axios
            .delete(api + id)
            .then(({ data }) => {
                const newArray = cadastrados.filter((user) => user.id !== id);
                setCadastrados(newArray);
                toast.success(data);
            })

            .catch(({ data }) => toast.error(data));
            
        setOnEdit(null);
    }

    useEffect(() => {
        if(onEdit) {
            const selecionado = ref.current;
            selecionado.nomeEdicao.value = onEdit[0].nome;
            selecionado.emailEdicao.value = onEdit[0].email;
            selecionado.foneEdicao.value = onEdit[0].fone;
            selecionado.categoriaEdicao.value = onEdit[0].categoriaEdicao;
        }
    },[onEdit]);

    const handleEdit = async (e) => {
        e.preventDefault();

        const selecionado = ref.current;

        await axios
            .put(api + onEdit[0].id, {
                nome: selecionado.nomeEdicao.value,
                email: selecionado.emailEdicao.value,
                fone: selecionado.foneEdicao.value,
                categoria: selecionado.categoriaEdicao.value,
            })

            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data));

    }

    return (
        <article className="container__edicao">
            <form ref={ref}>
                <fieldset className="form__edicao">
                    <label htmlFor="nomeEdicao">
                        Nome: 
                    </label>
                    <input
                        type="text"
                        name="nomeEdicao"
                        id="nameEdicao"
                    />
                    <label htmlFor="emailEdicao">
                        Email
                    </label>
                    <input
                        type="text"
                        name="emailEdicao"
                        id="emailEdicao"
                        required
                    />
                    <label htmlFor="foneEdicao">
                        Telefone: 
                    </label>
                    <input
                        type="tel"
                        name="foneEdicao"
                        id="foneEdicao"

                        required
                    />
                    <label htmlFor="categoriaEdicao">
                        Tipo: 
                    </label>
                    <select
                        name="categoriaEdicao"
                        id="categoriaEdicao"
                    >
                        <option
                        >
                            Contribuinte
                        </option>
                        <option
                        >
                            Fornecedor
                        </option>
                    </select>
                </fieldset>
                <button type="submit" onClick={handleEdit}>Atualizar</button>
                <button type="submit">Deletar</button>
            </form>
        </article>
    );
};