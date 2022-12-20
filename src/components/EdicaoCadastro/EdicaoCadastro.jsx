import { useState, useEffect, useRef } from "react";

import axios from "axios";

import { toast } from "react-toastify";

import "./EdicaoCadastro.css";

export function EdicaoCadastro({getCadastrados, cadastrados, setCadastrados, onEdit, setOnEdit}) {
    const api= import.meta.env.VITE_API;

    const ref = useRef();
    
    const handleDelete = async (e) => {
        e.preventDefault();
        await axios
            .delete(api + onEdit[0].id)
            .then(({ data }) => {
                toast.success(data);
                getCadastrados();
                const selecionado = ref.current;
                selecionado.nomeEdicao.value = "";
                selecionado.emailEdicao.value = "";
                selecionado.foneEdicao.value = "";
                selecionado.categoriaEdicao.value = "";

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

        selecionado.nomeEdicao.value = "";
        selecionado.emailEdicao.value = "";
        selecionado.foneEdicao.value = "";
        selecionado.categoriaEdicao.value = "";

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
                        className="containers__inputEdicao"
                    />
                    <label htmlFor="emailEdicao">
                        Email
                    </label>
                    <input
                        type="text"
                        name="emailEdicao"
                        id="emailEdicao"
                        className="containers__inputEdicao"
                    />
                    <label htmlFor="foneEdicao">
                        Telefone: 
                    </label>
                    <input
                        type="tel"
                        name="foneEdicao"
                        id="foneEdicao"
                        className="containers__inputEdicao"
                    />
                    <label htmlFor="categoriaEdicao">
                        Categoria: 
                    </label>
                    <select
                        name="categoriaEdicao"
                        id="categoriaEdicao"
                        className="seletores__EdicaoCategoria"
                    >
                        <option value="Contribuinte">
                            Contribuinte
                        </option>
                        <option value="Fornecedor">
                            Fornecedor
                        </option>
                    </select>
                </fieldset>
                <div className="botoes">
                    <button type="submit" onClick={handleEdit}>Atualizar</button>
                    <button type="submit" onClick={handleDelete}>Deletar</button>
                </div>
            </form>
        </article>
    );
};