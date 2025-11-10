const router = require('express').Router();
const createAnimal = require('../controllers/animal.create.controller.js');
const createUser = require('../controllers/user.create.controller.js').createUser;
const loginUser = require('../controllers/user.login.controller.js');
const userLogout = require('../controllers/user.logout.controller.js');
const searchbytag = require('../controllers/animal.searchbytag.controller.js');
const updateTreatment = require('../controllers/treatment.update.controller.js');
const searchTreatment = require('../controllers/treatment.search.controller.js');
const authorize = require('../middlewares/authorization.js');
const upload = require('../middlewares/multer.local.js');

// Define your routes here

router.post('/register', createUser);
router.post('/login', loginUser);
//protected routes
router.post('/logout', authorize, userLogout);
router.post('/create', authorize, upload.single('photo'), createAnimal);
router.get('/search', searchbytag);
router.post('/update/', authorize, upload.single('file'), updateTreatment);
router.get('/searchtreatment', authorize, searchTreatment);

module.exports = router;
