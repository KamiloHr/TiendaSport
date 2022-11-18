const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/errors")
const cookieParser = require("cookie-parser")
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const path = require("path")


//Seteamos archivo de configuracion
if(process.env.NODE_ENV!=="PRODUCTION") require('dotenv').config({path:'back/config/config.env'})

//Uso de contantes importadas
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());


//Importar rutas
const productosSport = require("./routes/products")
const ordenes = require("./routes/orders")

app.use('/api', productosSport) //Sujeto a decision (ruta del navegador)
app.use('/api', ordenes)

//ventas
const ventas = require("./routes/sales")
app.use('/api', ventas)


//cliente
const clientes = require("./routes/clientes")
app.use('/api', clientes)

//Auth
const usuarios = require("./routes/auth")
app.use("/api", usuarios)


if (process.env.NODE_ENV === "PRODUCTION") {
    app.use(express.static(path.join(__dirname, '../front/build')))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, '../front/build/index.html'))
    })
}
//Middleware para manejar error
app.use(errorMiddleware)


module.exports = app