const router = require('express').Router();
const createAnimal = require('../controllers/animal.create.controller.js');
const upload = require('../middlewares/multer.local.js');

// Define your routes here
router.post('/create', upload.single('photo'), createAnimal);

module.exports = router;
