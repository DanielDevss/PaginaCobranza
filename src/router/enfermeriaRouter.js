const express = require('express');
const EnfermeriaController = require('../controllers/enfermeriaController');
const router = express.Router();

router.get('/enfermeria', EnfermeriaController.index);
router.get('/enfermeria-educacion_inicial', EnfermeriaController.indexEduIni);
router.get('/enfermeria-prescolar', EnfermeriaController.indexPres);
router.get('/enfermeria-primaria', EnfermeriaController.indexPri);
router.get('/enfermeria-secundaria', EnfermeriaController.indexSec);

router.get('/enfermeria/mas-informacion/:id', EnfermeriaController.verMas)
router.get('/enfermeria/editar-registro/:id', EnfermeriaController.editar)
router.post('/enfermeria/editar-registro/:id', EnfermeriaController.actualizar)

module.exports = router;