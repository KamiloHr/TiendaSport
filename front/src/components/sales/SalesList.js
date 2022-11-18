import React, { Fragment} from 'react'
import Sidebar from '../admin/Sidebar'


export const SalesList = () => {
  
  
  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <h1>Lista de ventas</h1>
      </div>
    </Fragment>
  )
}

export default SalesList