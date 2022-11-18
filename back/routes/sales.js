const express=require("express")
const router=express.Router();

//lista de funciones de nuestro controlador
const {newSale,getAllSales,getSaleById,updateSale,deleteSale} = require("../controllers/salesController")

//ruta y metodo http 
//importamos estas rutas en "app.js"
router.route('/sales').get(getAllSales)
router.route('/sale/:id').get(getSaleById)
router.route('/sale/new').post(newSale)
router.route('/sale/:id').put(updateSale)
router.route('/sale/:id').delete(deleteSale)
module.exports=router;
