const {Router} = require('express');
const { getLoginPage, getRegisterPage, loginUser, registerUser, logout } = require('../controllers/auth.controller');
const {guest} = require('../middlewares/auth')
const router = Router();

router.get('/login', guest, getLoginPage)
router.get('/register', guest, getRegisterPage)
router.post('/login', guest, loginUser)
router.post('/register', guest, registerUser)
router.get('/logout', logout)

module.exports = router