const mongoose = require("mongoose")

const clientesSchema = mongoose.Schema({
    nombre: {
        type:String,
        required: [true,"por favor registre el nombre."],
        trim: true,
        maxlength: [120,"el nombre no puede exceder los 120 caracteres"]
    },
    email: {
        type:String,
        required: [true,"por favor registre el email."],
        maxlength: [120,"el email no puede exceder los 120 caracteres"]
    },
    password: {
        type:String,
        required: [true,"por favor registre el password."],
    },
    direccion: {
        type:String,
        required: [true,"por favor registre el direccion."],
        maxlength: [120,"el direccion no puede exceder los 120 caracteres"]
    }
})

module.exports = mongoose.model("clientes",clientesSchema)