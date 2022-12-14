import "./Spinner.css"

export function Spinner() {
    return (
        <article className="container__spinner">
            <div className="carregando" />
            <h3>Carregando...</h3> 
        </article>
    );
}