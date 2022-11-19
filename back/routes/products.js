const express = require("express")
const router = express.Router();

const {getProducts, newProduct, getProductById, updateProduct, deleteProduct, createProductReview, getProductReviews, deleteReview, getAdminProducts} = require("../controllers/productsController"); // Traemos la respuesta json desde el controlador
const { isAuthenticatedUser , authorizeRoles} = require("../middleware/auth");


//Probamos la autenticación

router.route('/producto/:id').get(getProductById)//Establecemos que ruta queremos ver al Ver producto por Id
router.route('/productos').get(getProducts) //Establecemos que ruta queremos ver el getProducts
router.route("/review").put(isAuthenticatedUser, createProductReview)
router.route("/reviews").get(isAuthenticatedUser, getProductReviews)
router.route("/review").delete(isAuthenticatedUser, deleteReview)

//Rutas Admin
router.route('/producto/nuevo').post(isAuthenticatedUser,authorizeRoles("admin"), newProduct)//Establecemos que ruta queremos ver al Crear Producto
router.route('/producto/:id').put(isAuthenticatedUser,authorizeRoles("admin"), updateProduct)//Establecemos que ruta queremos para actualizar producto
router.route('/producto/:id').delete(isAuthenticatedUser,authorizeRoles("admin"), deleteProduct)//Establecemos que ruta queremos para eliminar producto
router.route('/admin/productos').get(isAuthenticatedUser,authorizeRoles("admin"),getAdminProducts)//Establecemos que ruta queremos para eliminar producto




module.exports =router;