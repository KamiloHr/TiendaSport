const User = require("../models/auth")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const tokenEnviado = require("../utils/jwtToken");
const crypto = require("crypto")
const cloudinary = require("cloudinary")

//Registrar un nuevo usuario /api/usuario/registro
exports.registroUsuario = catchAsyncErrors(async (req, res, next) => {
    const { nombre, email, password } = req.body;

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 240,
        crop: "scale"
    })
    const user = await User.create({
        nombre,
        email,
        password,
        avatar:{
            public_id:result.public_id,
            url:result.secure_url
        }

    })
    tokenEnviado(user, 201, res)
})


//Iniciar Sesion - Login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    //revisar si los campos estan completos
    if (!email || !password) {
        return next(new ErrorHandler("Por favor ingrese email & Contraseña", 400))
    }

    //Buscar al usuario en nuestra base de datos
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
        return next(new ErrorHandler("Email o contraseña invalidos", 401))
    }

    //Comparar contraseñas, verificar si está bien
    const contrasenaOK = await user.compararPass(password);

    if (!contrasenaOK) {
        return next(new ErrorHandler("Contraseña invalida", 401))
    }

    tokenEnviado(user, 200, res)

})

//Cerrar Sesion (logout)
exports.logOut = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Cerró sesión"
    })
})


//Ver perfil de usuario (Usuario que esta logueado)
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})


//Update Contraseña (usuario logueado)
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    //Revisamos si la contraseña vieja es igual a la nueva
    const sonIguales = await user.compararPass(req.body.oldPassword)

    if (!sonIguales) {
        return next(new ErrorHandler("La contraseña actual no es correcta", 401))
    }

    user.password = req.body.newPassword;
    await user.save();

    tokenEnviado(user, 200, res)
})


//Update perfil de usuario (logueado)
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    //Actualizar el email por user a decisiòn de cada uno
    const newUserData = {
        nombre: req.body.nombre,
        email: req.body.email
    }

    //updata Avatar: 
    if (req.body.avatar !== "") {
        const user = await User.findById(req.user.id)
        const image_id = user.avatar.public_id;
        const res = await cloudinary.v2.uploader.destroy(image_id);

        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 240,
            crop: "scale"
        })

        newUserData.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        user
    })
})


//Servicios controladores sobre usuarios por parte de los ADMIN

//Ver todos los usuarios
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})

//Ver el detalle de 1 usuario
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`No se ha encontrado ningun usuario con el id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user
    })
})

//Actualizar perfil de usuario (como administrador)
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const nuevaData = {
        nombre: req.body.nombre,
        email: req.body.email,
        role: req.body.rol
    }

    const user = await User.findByIdAndUpdate(req.params.id, nuevaData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        user
    })
})

//Eliminar usuario(admin)
exports.deletedUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        return next(new ErrorHandler(`Usuario con id: ${req.params.id} no se encuentra en nuestra base de datos`))
    }

    await user.remove();

    res.status(200).json({
        success: true,
        message: "Usuario eliminado correctamente"
    })
})
