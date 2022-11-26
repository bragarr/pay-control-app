import { useState, useEffect, useRef } from "react";

import "./ContainerEdicao.css";

export function ContainerEdicao({onEdit, setOnEdit}) {

    const ref = useRef();
    
    // const handleDelete = async (id) => {
    //     await axios
    //         .delete("https://controle-pagamentos-backend.herokuapp.com/pagamentos" + id)
    //         .then(({ data }) => {
    //             const newArray = users.filter((user) => user.id !== id);
    //             setUsers(newArray);
    //             toast.success(data);
    //         })

    //         .catch(({ data }) => toast.error(data));
            
    //     setOnEdit(null);
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const pagamento = ref.current;
        
        if(onEdit) {
            await axios
                .put("https://mysql-cadastrousuarios.herokuapp.com/" + onEdit.id, {
                    tipo_pagamento: pagamento.tipo_pagamento.value,
                    nome: pagamento.nome.value,
                    valor_pagamento: pagamento.valor_pagamento.value,
                    obs: pagamento.obs.value,
                    data_pagamento: pagamento.data_pagamento.value
                })

                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        }
        document.querySelector(".container__edicao").classList.remove("container__ativo");
        setOnEdit(null);
    }

    useEffect(() => {
        if(onEdit) {
            const pagamento = ref.current;

            pagamento.nome.value = onEdit.nome;
            pagamento.valor_pagamento.value = onEdit.valor_pagamento;
            pagamento.obs.value = onEdit.obs;
        }
    }, [onEdit]);


    return (
        <article className="container__edicao">
            <form ref={ref}>
                <fieldset className="form__edicao">
                    <label htmlFor="tipo_pagamento">
                        Tipo: 
                    </label>
                    <select
                        name="tipo_pagamento"
                        id="tipo_pagamento"
                    >
                        <option
                        >
                            Entrada
                        </option>
                        <option
                        >
                            Despesa
                        </option>
                    </select>
                    <label htmlFor="nome">
                        Nome: 
                    </label>
                    <input
                        type="text"
                        name="nome"
                        id="name"
                    />
                    <label htmlFor="valor_pagamento">
                        Valor
                    </label>
                    <input
                        type="text"
                        name="valor_pagamento"
                        id="valor_pagamento"
                        required
                    />
                    <label htmlFor="obs">
                        Observação/Justificativa: 
                    </label>
                    <input
                        type="text"
                        name="obs"
                        id="obs"
                        maxLength="30"
                        required
                    />
                    <label htmlFor="data_pagamento">
                        Data da Pagamento: 
                    </label>
                    <input
                        type="date"
                        name="data_pagamento"
                        id="data_pagamento"
                        required
                    />
                </fieldset>
                <button
                    type="submit"
                >
                    Atualizar
                </button>
            </form>
        </article>
    );
};