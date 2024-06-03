const {Router} = require('express');
const { getLoginPage, getRegisterPage } = require('../controllers/auth.controller');
const router = Router();

router.get('/login', getLoginPage)
router.get('/register', getRegisterPage)

module.exports = router