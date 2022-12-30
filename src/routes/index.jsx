import { Route, Routes, Navigate } from "react-router-dom";

import { useAuth } from "../Hooks/useAuth";
import { auth } from "../contexts/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { Home } from "../pages/Home/Home";
import { Loading } from "../pages/Loading/Loading";
import { Cadastros } from "../pages/Cadastros/Cadastros"
import { Pagamentos } from "../pages/Pagamentos/Pagamentos"

export function MainRoutes() {

    const AreaReservadaCadastros = (parametro) => {
        const { logado } = useAuth();

        return logado > 0 ? <Cadastros /> : <Loading /> 
    }

    const AreaReservadaPagamentos = (parametro) => {
        const { logado } = useAuth();

        return logado > 0 ? <Pagamentos /> : <Loading /> 
    }

    const AreaReservadaHistorico = (parametro) => {
        const { logado } = useAuth();

        return logado > 0 ? <HistoricoPagamentos /> : <Loading /> 
    }

    return(
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="cadastros" element={<AreaReservadaCadastros Item={Cadastros} />}></Route>
            <Route path="pagamentos" element={<AreaReservadaPagamentos Item={Pagamentos} />}></Route>
            <Route path="*" element={<Navigate to={"/"}/>}></Route>
        </Routes>
    )
}