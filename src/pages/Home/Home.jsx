import { auth } from "../../contexts/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { LandPageInfo } from "../../components/LandPageInfo/LandPageInfo";
import { Dashboard } from "../../components/Dashboard/Dashboard";

export function Home() {

    const apiPayments= import.meta.env.VITE_API_PAGAMENTOS;

    const [user] = useAuthState(auth);
    
    const [payments, setPayments] = useState([]);

    const getPayments = async () => {
        try {
            const res = await axios.get(apiPayments);
            setPayments(res.data.sort((a,b) => (a.value < b.value ? 1 : -1)));
        } catch (error) {
            toast.error(error);
        }
    };

    useEffect(() => {
        getPayments();
    }, []);

    const MainTitle = () => {
        return !user
        ?
        ""
        :
        <article>
            <h2><b>Hello {user.displayName}</b></h2>
            <p>Check it out a brief about your data!</p>
        </article>
    }

    const PresantationHomePage = () => {
        return !user
        ?
        <LandPageInfo />
        :
        <Dashboard payments={payments} user={user} />

    }

    return(
        <section>
            <MainTitle />
            <PresantationHomePage />
        </section>
    )
}