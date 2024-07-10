const {Router} = require('express');
const { getLoginPage, getRegisterPage, loginUser, registerUser, logout } = require('../controllers/auth.controller');
const {guest} = require('../middlewares/auth')
const router = Router();
const upload = require('../utils/fileUpload')


router.get('/login', guest, getLoginPage)
router.get('/register', guest, getRegisterPage)
router.post('/login', guest, loginUser)
router.post('/register', guest, upload.single('avatar'), registerUser)
router.get('/logout', logout)

module.exports = router