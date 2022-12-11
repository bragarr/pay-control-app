import "./Spinner.css"

export function Spinner() {
    return (
        <article className="container__spinner">
            <h3>Carregando...</h3> 
            <div className="carregando" />
        </article>
    );
}