import { auth } from "../../contexts/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export function PayByRank(payments) {

    const [userOn] = useAuthState(auth);

    const paymentList = payments.payments;

    const mainListPayments = (paymentList.filter((list) => list.user===userOn.uid)).slice(0,10);
    
    const TopPayments = () => {
        return mainListPayments.length > 0
        ?
        <section>
            <h3>Ranked Incomes/Expenses</h3>
            <table className="table table-sm" width="300px">
                <thead className="table-dark">
                    <tr>
                        <th>N°</th>
                        <th>Type</th>
                        <th>Value</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {mainListPayments.map((item,i) => 
                        <tr key={i}>
                            <td>{i+1}</td>
                            <td>{item.type}</td>
                            <td>${item.value.toFixed(2)}</td>
                            <td>{item.obs}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
        :
        <p>No data!</p>
    }

    return (
        <TopPayments />
    );
}