import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router"
import Layout from './Layout'
import HomePage from './pages/home/HomePage'
import ContactPage from './pages/contact/ContactPage'
import SubscriptionPage from './pages/subscription/SubscriptionPage'
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='/subscription' element={<SubscriptionPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App