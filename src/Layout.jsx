import {Outlet} from "react-router";
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { ToastContainer } from 'react-toastify';
const Layout = () => {
  return (
    <>
    <Header />
    <ToastContainer />
    <Outlet/>
    <Footer/>
    </> 
  )
}

export default Layout