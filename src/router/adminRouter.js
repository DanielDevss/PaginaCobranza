const express = require('express');
const { storefactura } = require('../controllers/adminController');
const AdminController = require('../controllers/adminController');
const router = express.Router();

router.get('/admin', AdminController.index);
router.get('/admin-Educacion_Inicial', AdminController.indexEduIni);
router.get('/admin-Preescolar', AdminController.indexPre);
router.get('/admin-Primaria', AdminController.indexPri);
router.get('/admin-Secundaria', AdminController.indexSec);

router.get('/admin-nuevoRegistro', AdminController.create);
router.post('/admin-nuevoRegistro', AdminController.store);
router.post('/admin/borrar', AdminController.borrar)
router.post('/admin/enviarEnfermeria', AdminController.subirENF);
router.get('/admin/editarRegistro/:id', AdminController.editar);
router.post('/admin/editarRegistro/:id', AdminController.actualizar);

router.get('/admin-setting-contactos', AdminController.settingContac);
router.post('/admin-settingUpdate', AdminController.settingContacUpdate);
router.post('/admin-userRegister', AdminController.settingRegister);
router.post('/auth', AdminController.autenticate);
router.get('/logout', AdminController.logout);
router.get('/datos-setting-Usuarios', AdminController.passwordsDB);
router.post('/datos-setting-Usuarios/delete', AdminController.borrarUser);

router.get('/admin-mensajes', AdminController.adminMensajes);
router.post('/admin-mensajes/delete', AdminController.borrarMensajes);


module.exports = router;