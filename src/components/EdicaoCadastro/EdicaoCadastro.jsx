import { useState, useEffect, useRef } from "react";

import axios from "axios";

import { toast } from "react-toastify";
import { AiFillCloseCircle } from "react-icons/ai";

import "./EdicaoCadastro.css";

export function EdicaoCadastro({getCadastrados, onEdit, setOnEdit, categoriasRegistradas, getCategoriasRegistradas, setCategoriasRegistradas}) {
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
        fechaContainerEdicaoCadastro();
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

    useEffect(() => {
        getCategoriasRegistradas();
    }, [setCategoriasRegistradas]);

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

        fechaContainerEdicaoCadastro();

    }

    const fechaContainerEdicaoCadastro = () => {
        document.querySelector(".container__edicao").classList.remove("exibe__containerEdicao");
    }

    return (
        <article className="container__edicao">
            <form ref={ref} className="container__formularioEdicao">
                <fieldset className="form__edicao">
                    <div className="container__botaoFechar">
                        <AiFillCloseCircle onClick={fechaContainerEdicaoCadastro}/>
                    </div>
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
                        {categoriasRegistradas.map((item, i) => (
                            <option key={i}>{item.categoria}</option>
                        ))}
                    </select>
                    <div className="botoes__edicao">
                        <button type="submit" onClick={handleEdit} className="botao__edicao botao__edicao--editar">Salvar</button>
                        <button type="submit" onClick={handleDelete} className="botao__edicao botao__edicao--deletar">Deletar</button>
                    </div>
                </fieldset>
            </form>
        </article>
    );
};