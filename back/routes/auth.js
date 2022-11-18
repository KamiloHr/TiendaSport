const express=require("express");
const { registroUsuario, loginUser, logOut, getUserProfile, updatePassword, updateProfile, getAllUsers, getUserDetails, updateUser, deletedUser } = require("../controllers/authController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router= express.Router();

router.route('/usuario/registro').post(registroUsuario)
router.route('/login').post(loginUser)
router.route('/logout').get(isAuthenticatedUser, logOut)
router.route('/myPerfil').get(isAuthenticatedUser, getUserProfile)
router.route('/myPerfil/updatePassword').put(isAuthenticatedUser, updatePassword)
router.route('/myPerfil/updateDatos').put(isAuthenticatedUser, updateProfile)

//rutas Admin
router.route('/admin/allUsers').get(isAuthenticatedUser, authorizeRoles("admin"),getAllUsers)
router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeRoles("admin"),getUserDetails)
router.route('/admin/updateUser/:id').put(isAuthenticatedUser, authorizeRoles("admin"),updateUser)
router.route('/admin/deletedUser/:id').delete(isAuthenticatedUser, authorizeRoles("admin"),deletedUser)


module.exports= router