const express = require("express")
const router = express.Router();

const {getClientes, newCliente, getClienteById, updateCliente, deleteCliente}=require("../controllers/clientesController")

router.route('/clientes').get(getClientes)
router.route('/cliente/nuevo').post(newCliente)
router.route('/cliente/:id').get(getClienteById)
router.route('/cliente/:id').put(updateCliente)
router.route('/cliente/:id').delete(deleteCliente)

module.exports=router;
