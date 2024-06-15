const {Router} = require('express')
const { getHomePage } = require('../controllers/home.controller')

const router = Router()

router.get('/', getHomePage)

module.exports = router