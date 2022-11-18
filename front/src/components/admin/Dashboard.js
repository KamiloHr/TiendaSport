import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import { useDispatch, useSelector } from 'react-redux'

import { getAdminProducts } from '../../actions/productActions'
import { allOrders } from '../../actions/orderActions'
import { allUsers } from '../../actions/userActions'

export const Dashboard = () => {

    const dispatch = useDispatch();

    const { productos} = useSelector(state => state.products)
    const { users } = useSelector(state => state.allUsers)
    const { orders, cantidadTotal } = useSelector(state => state.allOrders)

    let outOfStock = 0;
    productos.forEach(product => {
        if (product.stock === 0) {
            outOfStock += 1;
        }
    })

    useEffect(() => {
        dispatch(getAdminProducts())
        dispatch(allOrders())
        dispatch(allUsers())
    }, [dispatch])

    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <h1 className="my-4">Dashboard</h1>

                    <Fragment>
                        <MetaData title={'Administracion'} />

                        <div className="row pr-4">
                            <div className="col-xl-12 col-sm-12 mb-3">
                                <div className="card text-white bg-primary o-hidden h-100">
                                    <div className="card-body">
                                        <div className="text-center card-font-size">Ventas Totales<br /> <b>${cantidadTotal && cantidadTotal.toFixed(2)}</b>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row pr-4">
                            <div className="col-xl-3 col-sm-6 mb-3">
                                <div className="card text-white bg-success o-hidden h-100">
                                    <div className="card-body">
                                        <div className="text-center card-font-size">Productos<br /> <b>{productos && productos.length}</b></div>
                                    </div>
                                    <Link className="card-footer text-white clearfix small z-1" to="/productList">
                                        <span className="float-left">Ver Detalles</span>
                                        <span className="float-right">
                                            <i className="fa fa-angle-right"></i>
                                        </span>
                                    </Link>
                                </div>
                            </div>


                            <div className="col-xl-3 col-sm-6 mb-3">
                                <div className="card text-white bg-danger o-hidden h-100">
                                    <div className="card-body">
                                        <div className="text-center card-font-size">Pedidos<br /> <b>{orders && orders.length}</b></div>
                                    </div>
                                    <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                                        <span className="float-left">Ver Detalles</span>
                                        <span className="float-right">
                                            <i className="fa fa-angle-right"></i>
                                        </span>
                                    </Link>
                                </div>
                            </div>


                            <div className="col-xl-3 col-sm-6 mb-3">
                                <div className="card text-white bg-info o-hidden h-100">
                                    <div className="card-body">
                                        <div className="text-center card-font-size">Usuarios<br /> <b>{users && users.length}</b></div>
                                    </div>
                                    <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                        <span className="float-left">Ver Detalles</span>
                                        <span className="float-right">
                                            <i className="fa fa-angle-right"></i>
                                        </span>
                                    </Link>
                                </div>
                            </div>


                            <div className="col-xl-3 col-sm-6 mb-3">
                                <div className="card text-white bg-warning o-hidden h-100">
                                    <div className="card-body">
                                        <div className="text-center card-font-size">Agotados<br /> <b>{outOfStock}</b></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>


                </div>
            </div>

        </Fragment >
    )
}





export default Dashboard
