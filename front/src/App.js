import './App.css';
import React, { useEffect } from 'react';
import Header from './components/layout/Header';
import Footer  from './components/layout/Footer';
import Home from './components/Home';
import { ProductDetails } from './components/products/ProductDetails';
//Router traido desde react-router-dom (no confundir con el de express)
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/admin/Dashboard';
import ProductsList from './components/admin/ProductList';
import NewProduct from './components/admin/NewProduct';
import Cart from './components/cart/Cart';
import { Login } from './components/user/Login';
import { Register } from './components/user/Register';
import { loadUser } from './actions/userActions';
import store from "./store"
import { Profile } from './components/user/Profile';
import ProtectedRoute from './components/routes/ProtectedRoute';
import { UpdateProfile } from './components/user/UpdateProfile';
import { UpdatePassword } from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import { NewPassword } from './components/user/NewPassword';

function App() {
  useEffect(()=>{
    store.dispatch(loadUser())
   },[])
   
  return (
    <Router>
    <div className="App">
        <Header />
        <div >
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/Home" element={<Home />}/>
            <Route path="/producto/:id" element={<ProductDetails />}/>
            <Route path="/productList" element={<ProductsList />}/>
            <Route path="/nuevoProducto" element={<NewProduct />}/>
            <Route path="/search/:keyword" element={<Home />}/>
            <Route path="/carrito" element={<Cart/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/myPerfil" element={<Profile/>} />
            <Route path="/myPerfil/updateDatos" element={<UpdateProfile/>} />
            <Route path="/myPerfil/updatePassword" element={<UpdatePassword/>} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/resetPassword/:token" element={<NewPassword />} />

            <Route path="/Dashboard" element={ <ProtectedRoute isAdmin={true}><Dashboard/></ProtectedRoute>}/>

          </Routes>
        </div>
        <Footer />
    </div>
    </Router>
  );
}

export default App;
