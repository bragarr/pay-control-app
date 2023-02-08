import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import { Home } from "../pages/Home/Home";
import { Loading } from "../pages/Loading/Loading";
import { Users } from "../pages/Users/Users"
import { PayFlow } from "../pages/PayFlow/PayFlow"
import { History } from "../pages/History/History";
import { SignIn } from "../pages/SignIn/SigIn";
import { SignUp } from "../pages/SignUp/SignUp";
import { Profile } from "../pages/Profile/Profile"
import { Categories } from "../pages/Categories/Categories"

export function MainRoutes() {

    const AllowAccess = ({ Item }) => {
        const { logged } = useAuth();

        return logged > 0 ? <Item /> : <Home /> 
    }

    return(
        <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/signin" element={<SignIn />}></Route>
            <Route exact path="/signup" element={<SignUp />}></Route>
            <Route exact path="/profile" element={<AllowAccess Item={Profile}/>}></Route>
            <Route exact path="/users" element={<AllowAccess Item={Users}/>}></Route>
            <Route exact path="/categories" element={<AllowAccess Item={Categories}/>}></Route>
            <Route exact path="/payflow" element={<AllowAccess Item={PayFlow}/>}></Route>
            <Route exact path="/history" element={<AllowAccess Item={History}/>}></Route>
            <Route path="*" element={<Navigate to={"/"}/>}></Route>
        </Routes>
    )
}