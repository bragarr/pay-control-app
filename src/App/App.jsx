import { BrowserRouter, Outlet } from 'react-router-dom';
import { FastLogin } from '../components/FastLogin/FastLogin';
import { FastSignUp } from '../components/FastSignUp/FastSignUp';
import { Header } from '../components/Header/Header';
import { SideMenu } from "../components/SideMenu/SideMenu";
import { AuthProvider } from '../contexts/Auth';
import { MainRoutes } from "../routes";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <FastLogin />
        <FastSignUp />
        <main>
          <SideMenu />
          <MainRoutes />
        </main>
        <Outlet />
      </BrowserRouter>
      <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER}/>
    </AuthProvider>
  )
}
