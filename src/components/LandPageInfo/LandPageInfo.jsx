import infoImg01 from "../../assets/img/img01.jpg"
import infoImg02 from "../../assets/img/img02.jpg"
import infoImg03 from "../../assets/img/img03.jpg"
import infoImg04 from "../../assets/img/img04.jpg"
import infoImg05 from "../../assets/img/img05.jpg"

export function LandPageInfo() {
    return (
        <article>
            <h2>What is PayControl?</h2>
            <p>
                This is an application that controls the flow of payments. Basically, recording
                incoming and outgoing payments as in a cash flow. In this way, the platform
                controls records with all entries and expenses, informing the user of their balance.
            </p>
            <h3>Input and edit your data</h3>
            <figure>
                <img src={infoImg04} alt="App Users Input Page" style={{width:"90%"}}/>
                <figcaption>Above you can see page for registration of people/companies on database</figcaption>
            </figure>
            <h3>Payment registration</h3>
            <figure>
                <img src={infoImg02} alt="App Payment Input Page" style={{width:"90%"}}/>
                <figcaption>Representação da legenda</figcaption>
            </figure>
        </article>
    );
}