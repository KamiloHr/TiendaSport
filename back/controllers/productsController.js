const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const producto = require("../models/productos")
const fetch = (url) => import('node-fetch').then(({ default: fetch(url) })); //Usurpacion del require Opcional
const cloudinary = require("cloudinary")

//Crear nuevo producto
exports.newProductSport = catchAsyncErrors(async (req, res, next) => {
    let imagen = []
    if (typeof req.body.imagen === "string") {
        imagen.push(req.body.imagen)
    } else {
        imagen = req.body.imagen
    }

    let imagenLink = []

    for (let i = 0; i < imagen.length; i++) {
        const result = await cloudinary.v2.uploader.upload(imagen[i], {
            folder: "products"
        })
        imagenLink.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.imagen = imagenLink;
    req.body.user = req.user.id;
    const product = await producto.create(req.body)
    res.status(201).json({
        success: true,
        product
    })
})

//Ver todos los productos
exports.getProductsSport = catchAsyncErrors(async (req, res, next) => {
    const productos = await producto.find();
    res.status(200).json({
        success: true,
        cantidad: producto.length,
        productos
    })
})

//Ver todos los productos con Inventario mayor 0
exports.getProductsSportInventory = async (req, res, next) => {
    const productos = await producto.find({ "inventario": { $gt: 0 } });

    res.status(200).json({
        success: true,
        cantidad: productos.length,
        productos
    })

}

//Ver un producto por ID
exports.getProductSportById = async (req, res, next) => {
    const product = await producto.findById(req.params.id)
    if (!product) {
        return res.status(404).json({
            success: false,
            message: "No encontramos ese producto"
        })
    }
    res.status(200).json({
        success: true,
        message: "Aqui debajo encunetras información sobre tu producto",
        product
    })
}

//Update un producto
exports.updateProductSport = catchAsyncErrors(async (req, res, next) => {
    let product = await producto.findById(req.params.id) //Variable de tipo modificable
    if (!product) {
        return next(new ErrorHandler("Producto no encontrado", 404))
    }
    let imagen = []

    if (typeof req.body.imagen == "string") {
        imagen.push(req.body.imagen)
    } else {
        imagen = req.body.imagen
    }
    if (imagen !== '') {
        //eliminar imagenes asociadas con el product
        for (let i = 0; i < product.imagen.lenght; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        }

        let imageLinks = []
        for (let i = 0; i < product.imagen.lenght; i++) {
            const result = await cloudinary.v2.uploader.upload(imagen[i], {
                folder: "products"
            })
            imageLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }
        req.body.imagen = imageLinks
    }

    //Si el objeto si existia, entonces si ejecuto la actualización
    product = await producto.findByIdAndUpdate(req.params.id, req.body, {
        new: true, //Valido solo los atributos nuevos o actualizados
        runValidators: true
    });
    //Respondo Ok si el producto si se actualizó
    res.status(200).json({
        success: true,
        message: "Producto actualizado correctamente",
        product
    })
})

//Update de Producto Stock
exports.updateProductSportStock = async (req, res, next) => {
    let product = await producto.findById(req.params.id)
    if (!product) {
        return res.status(404).json({
            success: false,
            message: "No encontramos ese producto"
        })
    }
    //Si el existe el objeto
    const stock = product.inventario;
    let valorStock = stock + parseInt(req.body.inventario)
    product = await producto.findOneAndUpdate(req.params.id, {
        $set: {
            inventario: valorStock
        },
    });
    const productInventario = await producto.findById(req.params.id)
    res.status(200).json({
        success: true,
        message: "Stock  actualizó correctamente",
        productInventario
    })
}
//Eliminar un Producto
exports.deletedProductSport = async (req, res, next) => {
    const product = producto.findById(req.params.id)
    if (!product) {
        res.status(404).json({
            success: false,
            message: "NO encontramos ese producto"
        })
    }
    await product.remove();
    res.status(200).json({
        success: true,
        message: "Producto Eliminado correctamente"
    })
}
