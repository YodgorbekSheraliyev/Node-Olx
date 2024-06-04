const {Router} = require('express');
const { getLoginPage, getRegisterPage, loginUser, registerUser } = require('../controllers/auth.controller');
const router = Router();

router.get('/login', getLoginPage)
router.get('/register', getRegisterPage)
router.post('/login', loginUser)
router.post('/register', registerUser)

module.exports = router