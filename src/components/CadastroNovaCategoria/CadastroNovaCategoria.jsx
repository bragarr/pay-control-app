import { useRef, useEffect } from "react";
import axios from "axios";

import { toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai";

export function CadastroNovaCategoria({apiCadastroCategorias, userOn, categoriasRegistradas, getCategoriasRegistradas}) {

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
    }, [categoriasRegistradas]);

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
        <article>
            <h3>Lista de Categorias</h3>
            <div>  
                <form ref={ref} onSubmit={handleSubmitNovaCategoria} className="row g-3 align-items-center">
                    <div class="col-12">
                        <label htmlFor="nova__categoria" className="form-label">Nova Categoria </label>
                        <input type="text" name="nova__categoria" id="nova__categoria" class="form-control" />
                    </div>
                    <div class="col-12">
                        <button type="submit" class="btn btn-primary">Save</button>
                    </div>
                </form>
                <table>
                    <thead>
                            <tr>
                                <th>Categoria</th>
                                <th>Criado por:</th>
                                <th>Deletar</th>
                            </tr>
                    </thead>
                    <tbody>      
                        {categoriasRegistradas.map((item, i) => (
                            <tr key={i}>
                                <td>{item.categoria}</td>
                                <td>{item.criador}</td>
                                <td><AiFillDelete onClick={() => handleDeleteCategoria(item.idcategorias)} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </article>
    );
};