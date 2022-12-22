import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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
                        </tr>
                </thead>
                <tbody className="table__body">      
                    {categoriasRegistradas.map((item, i) => (
                        <tr key={i}>
                            <td className="item__categoria">{item.categoria}</td>
                            <td className="item__criador">{item.criador}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </article>
    );
};