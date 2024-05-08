
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'

import PrivateRoute from './PrivateRoutes'
import About from '../pages/About'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
    </Routes>
  )
}

export default AllRoutes