const express = require('express');
const { storefactura } = require('../controllers/adminController');
const AdminController = require('../controllers/adminController');
const router = express.Router();

router.get('/admin', AdminController.index);
router.get('/admin/nuevoRegistro', AdminController.create);
router.post('/admin/nuevoRegistro', AdminController.store);
router.post('/admin/borrar', AdminController.borrar)
router.post('/admin/enviarEnfermeria', AdminController.subirENF);
router.get('/admin/editarRegistro/:id', AdminController.editar);
router.post('/admin/editarRegistro/:id', AdminController.actualizar);


module.exports = router;