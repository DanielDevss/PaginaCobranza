const express = require ('express');
const TutorController = require ('../controllers/tutorController');
const router = express.Router();

router.get('/registro', TutorController.index);

module.exports = router;