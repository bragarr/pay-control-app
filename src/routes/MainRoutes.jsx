import { Route, Routes, Navigate } from "react-router-dom";

import { useAuth } from "../Hooks/useAuth";
import { auth } from "../contexts/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { Home } from "../pages/Home/Home";
import { Loading } from "../pages/Loading/Loading";
import { Registration } from "../pages/Registration/Registration"
import { CashFlow } from "../pages/CashFlow/CashFlow"
import { CashFlowHistory } from "../pages/CashFlowHistory/CashFlowHistory";

export function MainRoutes() {

    const AllowsUserAccessRegistration = (parametro) => {
        const { logged } = useAuth();

        return logged > 0 ? <Registration /> : <Loading /> 
    }

    const AllowsUserAccessCashFlow = (parametro) => {
        const { logged } = useAuth();

        return logged > 0 ? <CashFlow /> : <Loading /> 
    }

    const AllowsUserAccessHistory = (parametro) => {
        const { logged } = useAuth();

        return logged > 0 ? <CashFlowHistory /> : <Loading /> 
    }

    return(
        <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/registration" element={<AllowsUserAccessRegistration Item={Registration} />}></Route>
            <Route exact path="/cashflow" element={<AllowsUserAccessCashFlow Item={CashFlow} />}></Route>
            <Route exact path="/history" element={<AllowsUserAccessHistory Item={CashFlowHistory} />}></Route>
            <Route path="*" element={<Navigate to={"/"}/>}></Route>
        </Routes>
    )
}