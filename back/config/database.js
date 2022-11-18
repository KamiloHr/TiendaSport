const mongoose = require("mongoose")

const connectDatabase = ()=>{
    mongoose.connect(process.env.DB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology:true
    }).then(conection =>{
        console.log(`Base de datos monogo conectada con el servidor: ${conection.connection.host}:${process.env.PORT}`)
    }).catch(conection =>{
        console.log(`No se logro la conexion con la base de datos`)
    })
}

module.exports=connectDatabase;