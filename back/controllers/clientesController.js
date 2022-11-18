
const cliente = require("../models/clientes")

//crear cliente
exports.newCliente = async (req,res,next) =>{
    const clienteNew = await cliente.create(req.body)
    res.status(201).json ({
        success:true,
        clienteNew
    })
}

//listar clientes
exports.getClientes = async (req,res,next) =>{
    const clientes = await cliente.find();
    if (!clientes){
        return res.status(404).json({
            success:false,
            error:true
        })

    }
    res.status(200).json({
        success:true,
        cantidad: clientes.length,
        clientes
    })

}

//listar por id
exports.getClienteById = async (req,res,next) =>{
    const client = await cliente.findById(req.params.id);
    if (!client){
        return res.status(404).json({
            success:false,
            message:"no encontramos este cliente",
            error:true
        })
    }
    res.status(200).json({
        success:true,
        message: "aqui debajo encuentras información sobre este cliente",
        client
    })
}

//update cliente
exports.updateCliente = async (req,res,next) =>{
    let client = await cliente.findById(req.params.id);
    if (!client){
        return res.status(404).json({
            success:false,
            message:"no encontramos este cliente",
        })
    }
    client = await cliente.findOneAndUpdate(req.params.id,req.body,{
        runValidators: true
    })
    res.status(200).json({
        success:true,
        message: "cliente actualizado correctamente",
        client
    })
}

//eliminar 
exports.deleteCliente = async (req,res,next) =>{
    const client = await cliente.findById(req.params.id);
    if (!client){
        return res.status(404).json({
            success:false,
            message:"no encontramos este cliente",
           
        })
    }
    await client.remove();
    res.status(200).json({
        success:true,
        message: "cliente eleminado correctamente"
       
    })
}