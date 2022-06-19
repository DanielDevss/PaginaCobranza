const express = require ('express');
const TutorController = require ('../controllers/tutorController');
const router = express.Router();

router.get('/registros', TutorController.index);
router.get('/registros-educacion_inicial', TutorController.indexEduInc);
router.get('/registros-preescolar', TutorController.indexPre);
router.get('/registros-primaria', TutorController.indexPri);
router.get('/registros-secundaria', TutorController.indexSec);

router.get('', TutorController.homepage);
router.get('/ayuda', TutorController.help);

router.get('/contactanos', TutorController.redesContactanos);
router.post('/enviar-mensaje', TutorController.enviarMessage);

//router.post('/create-checkout-session', TutorController.pagarColegiatura)

module.exports = router;