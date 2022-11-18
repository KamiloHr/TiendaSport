const express = require("express")
const router = express.Router();

const {getProductsSport,newProductSport,getProductSportById,updateProductSport,deletedProductSport, getProductsSportInventory, updateProductSportStock} = require("../controllers/productsController"); //Traemos la respuesta json desde el controlador
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route('/productosSport').get(getProductsSport) //Establecemos desde que ruta queremos ver el getProducts
router.route('/productosSportInventory').get(getProductsSportInventory) //Establecemos desde que ruta queremos ver el getProducts
router.route('/productoSport/nuevo').post(isAuthenticatedUser,authorizeRoles("admin"),newProductSport)//Establecemos desde que ruta queremos Crear un Producto
router.route('/productoSport/:id').get(getProductSportById)//Establecemos desde que ruta queremos Buscar por Id
router.route('/productoSport/:id').put(updateProductSport)//Establecemos desde que ruta queremos Actualizar producto
router.route('/productoSportStock/:id').put(updateProductSportStock)//Establecemos desde que ruta queremos Actualizar Stock
router.route('/productoSport/:id').delete(deletedProductSport)//Establecemos desde que ruta queremos Eliminar producto

router.route('/admin/productos').get(getProductsSport) //Establecemos desde que ruta queremos ver el getProducts




module.exports=router;