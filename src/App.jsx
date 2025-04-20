import { BrowserRouter, Routes, Route, Navigate } from "react-router"
import Layout from './Layout'
import HomePage from './pages/home/HomePage'
import ContactPage from './pages/contact/ContactPage'
import SubscriptionPage from './pages/subscription/SubscriptionPage'
import MenuPage from "./pages/menu/MenuPage"
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from "./pages/dashboard/DashboardPage"
import ProfilePage from "./pages/ProfilePage"
import NoPage from './pages/NoPage'
import PaymentSuccess from './components/paymentGateway/PaymentSuccess'
import OrderHistory from "./components/myProfile/OrderHistory"

const App = () => {



  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='/menus' element={<MenuPage />} />
            <Route path='/subscriptions' element={<SubscriptionPage />} />
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>
            <Route path="/dashboard" element={<DashboardPage/>} />
            <Route path='/orders' element={<OrderHistory/>}/>
            <Route path='/profile' element={<ProfilePage/>}/>
            <Route path="*" element={<NoPage />} />
            <Route path='/payment-success' element={<PaymentSuccess />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App