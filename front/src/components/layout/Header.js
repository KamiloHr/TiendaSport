import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { logout } from '../../actions/userActions'


const Header = () => {
    const { cartItems } = useSelector(state => state.cart)

    const dispatch = useDispatch();
    const { user, loading } = useSelector(state => state.auth)

    const logoutHandler = () => {
        dispatch(logout());
    }
    return (
        <Fragment>
            <nav className='navbar row'>
                <div className='col-12'>
                </div>
                <div className='col-12 col-md-3 '>
                    <div className='navbar-brand'>
                        <Link to="/"><img src='../images/logo2.png' alt='Sport store'></img></Link>
                    </div>
                </div>
                <div className='col-12 col-md-6 mt-2 mt-md-0'>
                    <div className='input-group' >
                        <input
                            type="text"
                            id="search_field"
                            className="form-control"
                            placeholder="Que producto busca ?">
                        </input>
                        <div className='input-group-append'>
                            <button id='search_btn' className='btn'>
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </button>

                        </div>
                    </div>
                </div>
                <div className='col-12 col-md-3 mt-4 mt-md-0 text-center'>
                    <Link to="/carrito">
                        <i className='fa fa-shopping-cart fa-2x text-white text-center' aria-hidden="true"></i>
                        <span className='ml-1' id='cart_count'>{cartItems.length}</span>
                    </Link>
                    {user ? (
                        <div className="ml-4 dropdown d-inline">
                            <Link to="#!" className="btn dropdown-toggle text-white mr-4" type="button"
                                id="dropDownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <figure className='avatar avatar-nav'>
                                    <img src={user.avatar && user.avatar.url}
                                        alt={user && user.nombre}
                                        className="rounded-circle">
                                    </img>
                                </figure>
                                <span>{user && user.nombre}</span>
                            </Link>
                            <div className='dropdown-menu' aria-labelledby='dropDownMenu'>
                                {/* Preguntamos el rol de quien esta online */}
                                {
                                    user && user.role === "admin" && (
                                        <Link className="dropdown-item" to="/Dashboard">Adm. Productos</Link>
                                    )
                                }

                                <Link className="dropdown-item" to="/">Pedidos</Link>
                                <Link className="dropdown-item" to="/myPerfil">Mi Perfil</Link>
                                <Link className="dropdown-item" to="/" onClick={logoutHandler}>Cerrar Sesion</Link>
                            </div>
                        </div>
                    ) : !loading && <Link to="/login" className='btn ml-4' id='login_btn'>Login</Link>}

                </div>
            </nav>

        </Fragment>

    )
}

export default Header