const router = require('express').Router();
const userController = require('../controllers/userController');


router.post('/', userController.register);

// User routes
router.post('/registerUser', userController.register);
router.get('/getAllUsers', userController.getAllUsers);
router.get('/getUserById/:id', userController.getUserById);
router.get('/getUserData/:username', userController.getUserData);
router.post('/login', userController.loginUser);
router.put('/updateUserById/:id', userController.updateUserById);
router.delete('/deleteUserById/:id', userController.deleteUserById);

// Med routers

module.exports = router;