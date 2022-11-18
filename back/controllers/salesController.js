//importamos el modelo sale.js
const venta = require("../models/sale");

//funcion que nos permite crear una nueva venta
//al exportarla la utilizaremos en la carpeta routes"sales.js"
exports.newSale=async(req,res,next)=>{
    const ventas = await venta.create(req.body);
    res.status(201).json({
        ventas
    })
}

//trae una venta por su id
exports.getSaleById = async(req,res,next) =>{
    const SaleById = await venta.findById(req.params.id);
    if(!SaleById){
        return res.status(404).json({
            success:false,
            message:"Sale not found"
        })
    }
    res.status(200).json({
        SaleById
    })
}
//listá todas las ventas 
exports.getAllSales=async(req,res,next)=>{
    const ventas = await venta.find();
    res.status(200).json({
        cantidad: ventas.length,
        ventas
    })
}

//actualiza una venta existente
exports.updateSale = async(req,res,next) =>{
    let saleToUpdate = await venta.findById(req.params.id);
    if(!saleToUpdate){
        return res.status(404).json({
            success:false,
            message:"Sale not found"
        })
    }
    saleToUpdate = await venta.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    });

    res.status(200).json({
        saleToUpdate
    })
}
//Elimina una venta por su id 
exports.deleteSale = async(req,res,next) =>{
    const saleToDelete = await venta.findById(req.params.id);
    if(!saleToDelete){
        return res.status(404).json({
            success:false,
            message:"Sale not found"
        })
    }
    await saleToDelete.remove();
    res.status(200).json({
        success:true,
        message:"Sale deleted",
        saleToDelete
    })
}