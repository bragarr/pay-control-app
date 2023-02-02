import { BrowserRouter ,Outlet } from 'react-router-dom';
import { AuthProvider } from '../contexts/Auth';
import { MainRoutes } from "../routes/MainRoutes";

import { NavBar } from "../components/NavBar/NavBar"
import { Footer } from '../components/Footer/Footer';

import "./App.css"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <main>
          <MainRoutes />
          <Outlet />
        </main>
        <Footer />
      </BrowserRouter>
      <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER}/>
    </AuthProvider>
  )
}
