import { BrowserRouter, Outlet } from 'react-router-dom';
import { FastLogin } from '../components/FastLogin/FastLogin';
import { Header } from '../components/Header/Header';
import { SideMenu } from "../components/SideMenu/SideMenu"
import { MainRoutes } from "../routes";
import './App.css'

export function App() {

  return (
    <BrowserRouter>
      <Header />
      <FastLogin />
      <main>
        <SideMenu />
        <MainRoutes />
      </main>
      <Outlet />
    </BrowserRouter>
  )
}
