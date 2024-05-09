
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'

import PrivateRoute from './PrivateRoutes'
import About from '../pages/About'
import Admin from '../pages/admin/Admin'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<Login />} />
    </Routes>
  )
}

export default AllRoutes