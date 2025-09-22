const router = require('express').Router();
const createAnimal = require('../controllers/animal.create.controller.js');
const createUser = require('../controllers/user.create.controller.js').createUser;
const loginUser = require('../controllers/user.login.controller.js');
const userLogout = require('../controllers/user.logout.controller.js');
const authorize = require('../middlewares/authorization.js');
const upload = require('../middlewares/multer.local.js');

// Define your routes here
router.post('/create', authorize, upload.single('photo'), createAnimal);
router.post('/register', createUser);
router.post('/login', loginUser);
router.post('/logout', authorize, userLogout);

module.exports = router;
