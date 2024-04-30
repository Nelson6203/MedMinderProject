const router = require('express').Router();
const userController = require('../controllers/userController');
const medController = require('../controllers/medController');
const emailController = require('../controllers/emailController'); 

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
router.post('/registerMed', medController.Medregister);
router.get('/getMedById/:userID', medController.getMedById);
router.delete('/deleteMedById/:id', medController.deleteMedById);

// Email routers
router.post('/send-email', emailController.sendEmail);

module.exports = router;
