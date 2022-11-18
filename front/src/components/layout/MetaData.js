import React from "react";
import {Helmet} from "react-helmet"

//Titulos
const MetaData = ({title}) => {
    return(
        <Helmet>
           <title>{`${title} - Tienda Sport Dt`}</title>
        </Helmet>
    )
}
export default MetaData