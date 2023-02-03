import { PayInput } from "../../components/PayInput/PayInput";
import { IoIosArrowDroprightCircle } from "react-icons/io"

export function PayFlow() {

    return (
        <section>
            <h2>Input <IoIosArrowDroprightCircle /> Payments</h2>
            <PayInput />
        </section>
    );
};