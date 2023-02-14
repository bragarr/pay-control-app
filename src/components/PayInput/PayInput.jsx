import axios from "axios";
import { useRef ,useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../contexts/Firebase";
import { toast } from "react-toastify";

export function PayInput() {
    const api = import.meta.env.VITE_API;
    const apiPayments= import.meta.env.VITE_API_PAGAMENTOS;

    const [userOn] = useAuthState(auth);

    const [allUsers, setAllUsers] = useState([]);

    const getAllUsers = async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        const usersList = data.filter((list) => list.user===userOn.uid)
        setAllUsers(usersList);
    }

    const selectCategory = () => {
        const namePersonCompany = document.querySelector(".option__selected").value;
        const formInputCategory = document.querySelector(".category");
        const categoryRegistered = allUsers.filter((item) => namePersonCompany===item.name);
        formInputCategory.value = categoryRegistered[0].category;
    }

    useEffect(()=>{
        getAllUsers(api);
    },[]);

    const ref = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentPayment = ref.current;
    
        await axios
            .post(apiPayments, {
                name: currentPayment.name.value,
                type: currentPayment.type.value,
                category: currentPayment.category.value,
                value: currentPayment.value.value,
                obs: currentPayment.obs.value,
                date: currentPayment.date.value,
                user: userOn.uid
            })
            .then (({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data))

        currentPayment.name.value = "";
        currentPayment.category.value = "";
        currentPayment.value.value = "";
        currentPayment.obs.value = "";
        currentPayment.date.value = "";

    }

    const CarregamentoDeDados = () => {
        return allUsers.length <= 0
        ?
        <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
        :
        <form ref={ref} onSubmit={handleSubmit} className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="type" className="form-label">Payment type</label>
                    <select name="type" id="type" className="form-select">
                        <option>Income</option>
                        <option>Expense</option>
                    </select>
                </div>
                <div className="col-md-6">
                    <label htmlFor="name" className="form-label">Name</label>
                    <select name="name" id="name" className="form-select option__selected" onChange={selectCategory}>
                        <option>Select...</option>
                        {allUsers.length > 0 && allUsers.map((item, i) => <option key={i}>{item.name}</option>)}
                    </select>
                </div>
                <div className="col-md-6">
                    <label htmlFor="category" className="form-label">Category</label>
                    <input
                        type="text"
                        name="category"
                        id="category"
                        className="form-control category"
                        disabled
                        defaultValue={""}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="value" className="form-label">Value ($)</label>
                    <input
                        type="text"
                        name="value"
                        id="value"
                        placeholder="1000.00 - Type only numbers..."
                        required
                        className="form-control"
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="obs" className="form-label">Description</label>
                    <input
                        type="text"
                        name="obs"
                        id="obs"
                        maxLength="30"
                        placeholder="Payment description"
                        required
                        className="form-control"
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="date" className="form-label">Date:</label>
                    <input type="date" name="date" id="date" required className="form-control" />
                </div>
                <div>
                    <button type="submit" className="btn btn-outline-success">Save</button>
                </div>
        </form>
    }
    return (
        <CarregamentoDeDados />
    );
};