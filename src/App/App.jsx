import { BrowserRouter ,Outlet } from 'react-router-dom';
import { AuthProvider } from '../contexts/Auth';
import { MainRoutes } from "../routes/MainRoutes";
import { NavBar } from "../components/NavBar/NavBar"
import { NavBarNotSignedIn } from '../components/NavBarNotSignedIn/NavBarNotSignedIn';
import { useAuth } from "../Hooks/useAuth";

import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function App() {

  const DefineNavBar = () => {
    const { logged } = useAuth();
    return logged > 0
    ?
    <NavBar />
    :
    <NavBarNotSignedIn /> 
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <DefineNavBar />
        <main className="m-5">
          <MainRoutes />
          <Outlet />
        </main>
      </BrowserRouter>
      <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER}/>
    </AuthProvider>
  )
}
