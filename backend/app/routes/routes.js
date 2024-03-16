const router = require('express').Router();
const userController = require('../controllers/userController');


router.post('/', userController.register);

// User routes
router.post('/registerUser', userController.register);
router.get('/getAllUsers', userController.getAllUsers);
router.get('/getUserById/:id', userController.getUserById);
router.post('/login', userController.loginUser);


// Med routers

module.exports = router;