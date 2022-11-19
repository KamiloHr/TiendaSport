const app=require("./app")
const cloudinary = require("cloudinary")

//Setear el archivo de configuracion
const dotenv=require("dotenv");

//conexion base de datos
const connectDatabase = require("./config/database");

if(process.env.NODE_ENV!=="PRODUCTION") require('dotenv').config({path:'back/config/config.env'})


//configurar Cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

//Llamamos al server
const server=app.listen(process.env.PORT, ()=>{
    console.log(`Servidor iniciado en el puerto: ${process.env.PORT} en modo: ${process.env.NODE_ENV}`)
})


connectDatabase();
