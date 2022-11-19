const app=require("./app")
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary")

//Setear el archivo de configuración
const dotenv=require("dotenv");
dotenv.config({path: 'back/config/config.env'})

//Configurar base datos
connectDatabase();

//configurar Cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

//llamar server
const server=app.listen(process.env.PORT, () => {
    console.log(`Servidor iniciado en el puerto: ${process.env.PORT} en modo: ${process.env.NODE_ENV}`)
})
