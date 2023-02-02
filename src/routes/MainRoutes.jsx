import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import { Home } from "../pages/Home/Home";
import { Loading } from "../pages/Loading/Loading";
import { Registration } from "../pages/Registration/Registration"
import { CashFlow } from "../pages/CashFlow/CashFlow"
import { CashFlowHistory } from "../pages/CashFlowHistory/CashFlowHistory";
import { Access } from "../pages/Access/Access";

export function MainRoutes() {

    const AllowAccess = ({ Item }) => {
        const { logged } = useAuth();

        return logged > 0 ? <Item /> : <Loading /> 
    }

    return(
        <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/access" element={<AllowAccess Item={Access}/>}></Route>
            <Route exact path="/registration" element={<AllowAccess Item={Registration}/>}></Route>
            <Route exact path="/cashflow" element={<AllowAccess Item={CashFlow}/>}></Route>
            <Route exact path="/history" element={<AllowAccess Item={CashFlowHistory}/>}></Route>
            <Route path="*" element={<Navigate to={"/"}/>}></Route>
        </Routes>
    )
}