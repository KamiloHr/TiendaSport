import './App.css';
import React, { useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import SalesList from './components/sales/SalesList';
//import ProductDetails from './components/products/ProductDetails';
//Router traido desde react-router-dom (no confundir con el de express)--RUTAS FRONT--
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/admin/Dashboard';
import ProductsList from './components/admin/ProductList';
import NewProduct from './components/admin/NewProduct';
import Cart from './components/Cart/Cart';
import ProtectedRoute from './routes/ProtectedRoute';
import { Login } from './components/user/Login';
import { Register } from './components/user/Register';
import store from './store';
import { loadUser } from './actions/userActions';
import { Profile } from './components/user/Profile';
import { UpdateProfile } from './components/user/UpdateProfile';
import { UpdatePassword } from './components/user/UpdatePassword';
import { ProductDetails } from './components/products/ProductDetails';
import Shipping from './components/Cart/Shipping';
import { ConfirmOrder } from './components/Cart/ConfirmOrder';
import { Payment } from './components/Cart/Payment';
import { Success } from './components/Cart/Success';
import { useSelector } from 'react-redux';
import { UpdateProduct } from './components/admin/UpdateProduct';
import OrdersList from './components/admin/OrdersList';
import { ListOrder } from './components/order/ListOrder';
import UsersList from './components/admin/UserList';
import UpdateUser from './components/admin/UpdateUser';


function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  const {user,isAuthenticated,loading } = useSelector ( state => state.auth)
  return (
    <Router>
      <div className='App'>
        <Header />

        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/Home' element={<Home />}></Route>
          <Route path="/producto/:id" element={<ProductDetails />} />
          <Route path='/ventas' element={<SalesList />}></Route>
          <Route path="/productList" element={<ProductsList />} />
          <Route path="/nuevoProducto" element={<NewProduct />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/myPerfil" element={<Profile />} />
          <Route path="/myPerfil/updateDatos" element={<UpdateProfile />} />
          <Route path="/myPerfil/updatePassword" element={<UpdatePassword />} />

          <Route path="/Dashboard"
            element={<ProtectedRoute isAdmin={true}><Dashboard /></ProtectedRoute>} />

          <Route path="/updateProduct/:id"
            element={<ProtectedRoute isAdmin={true}><UpdateProduct /></ProtectedRoute>} />

          <Route path="/shipping"
            element={<ProtectedRoute><Shipping /></ProtectedRoute>} />

          <Route path="/order/confirm"
            element={<ProtectedRoute><ConfirmOrder /></ProtectedRoute>} />

          <Route path="/payment"
            element={<ProtectedRoute><Payment /></ProtectedRoute>} />

          <Route path="/success"
            element={<ProtectedRoute><Success /></ProtectedRoute>} />

          <Route path="/admin/orders"
            element={<ProtectedRoute isAdmin={true}><OrdersList /></ProtectedRoute>} />

          <Route path="/admin/order"
            element={<ProtectedRoute><ListOrder /></ProtectedRoute>} />

          <Route path="/admin/users"
            element={<ProtectedRoute isAdmin={true}><UsersList /></ProtectedRoute>} />

             <Route path="/admin/user/:id"
              element={<ProtectedRoute isAdmin={true}><UpdateUser /></ProtectedRoute>} />

        </Routes>
      </div>
      {!loading && (isAuthenticated || user.role !== "admin" ) && (
        <Footer/>
      ) }

    </Router>
  );
}

export default App;
