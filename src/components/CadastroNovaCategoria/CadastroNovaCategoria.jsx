import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { AiFillEdit, AiFillDelete } from "react-icons/ai";

export function CadastroNovaCategoria({apiCadastroCategorias, userOn, categoriasRegistradas, setCategoriasRegistradas, getCategoriasRegistradas}) {

    const ref = useRef();

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
    }, [setCategoriasRegistradas]);

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
        <article className="container__categorias">
            <h3>Lista de Categorias</h3>
            <form ref={ref} onSubmit={handleSubmitNovaCategoria} className="formulario__categoria">
                <fieldset>
                    <label htmlFor="nova__categoria">Nova Categoria </label>
                    <input type="text" name="nova__categoria" id="nova__categoria" />
                    <button type="submit">Salvar</button>
                </fieldset>
            </form>
            <table className="tabela__categorias">
                <thead className="table__head">
                        <tr>
                            <th className="tipo__categorias">Categoria</th>
                            <th className="tipo__criadoPor">Criado por:</th>
                            <th className="tipo__deletar">Deletar</th>
                        </tr>
                </thead>
                <tbody className="table__body">      
                    {categoriasRegistradas.map((item, i) => (
                        <tr key={i}>
                            <td className="item__categoria">{item.categoria}</td>
                            <td className="item__criador">{item.criador}</td>
                            <td className="item__deletar"><AiFillDelete onClick={() => handleDeleteCategoria(item.idcategorias)} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </article>
    );
};