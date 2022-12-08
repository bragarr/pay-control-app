import "./Spinner.css"

export function Spinner() {
    return (
        <article className="container__spinner">
            <h3>Carregando banco de dados...</h3> 
            <div className="carregando" />
        </article>
    );
}