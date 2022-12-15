import { RegistroPagamentos } from "../../components/RegistroPagamentos/RegistroPagamentos";

import "./Pagamentos.css"

export function Pagamentos() {

    return (
        <section className="tela__pagamentos">
            <article className="intrucoes__aplicação">
                <h2 className="titutlo__pagina">Fluxo de Pagamentos</h2>
                <p>
                    Aqui você realizará o registro de pagamentos de pessoas/empresas
                    conforme o preenchimento dos campos abaixo:
                </p>
                <p>
                    Tipo → A classificação do tipo de pagamento divide-se em duas
                    categorias: Entrada e Despesa. Todas as entradas irão gerar saldo
                    positivo no fluxo de pagamentos, enquanto as depesas irão gerar
                    saldo negativo
                </p>
                <p>
                    Nome → O nome a quem será atribuído o pagamento registrado será feito
                    através do filtro de dados de pessoas/empresas cadastrados pelo usuário.
                    Apenas pessoas/empresas registrados no banco de dados podem ser relacionados
                    a pagamentos registrados nessa página. Se o nome da pessoa/empresa não for
                    encontrado nesta lista, basta apenas ir na página de cadastro e realizar
                    um novo cadastro e imediatamente a lista será atualizada.
                </p>
                <p>
                    Valor → O Valor refere-se ao valor ser registrado de pagamento. Para valores
                    que contemples dados decimais o valor deve ser registrado conforme exemplo a
                    seguir: 500.25 | 1025.73 | 10500.72 | 500325.47
                </p>
                <p>
                    Descrição → O Campo de Descrição serve para que o usuário descreva brevemente
                    o registro do pagamento que está salvando na plataforma.
                </p>
                <p>
                    Data → A data deve ser registrada conforme a data que os pagamentos serão
                    realizados. Este controle e definição deve ser registrado estritamente pelo
                    usuário.
                </p>
            </article>
            <article className="container__entradas">
                <h3>Registro de Entradas/Despesas</h3>
                <RegistroPagamentos />
            </article>
        </section>
    );
};