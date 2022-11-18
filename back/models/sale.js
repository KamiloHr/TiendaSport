//nos permite utilizar las herramientas de mongoose
const mongoose = require("mongoose")

const salesSchema = mongoose.Schema({
    fecha:{
        type:String,
        trim:true,
        required: true
    },
    idCliente:{
        type:String,
        trim:true,
        required: true
    },
    idVenta:{
        type:String,
        trim:true,
        required: false
    },
    valor:{
        type:Number,
        required: true
    },
    confirmado:{
        type:Boolean,
        required:true
    },
    detalleCompra:[
        {
            idProducto:{
                type:String,
                required: true,
                trim:true
            },
            cantidad:{
                type:Number,
                maxLength: 2
            }
        }
    ]
})

//atravez de mongoose creamos el modelo que se llamara "sales"
//y que contendra el esquema json de arriba
//el cual usaremos en "salesController"
module.exports=mongoose.model("sales",salesSchema)