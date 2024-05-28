const {Router} = require('express')
const { addNewPosterPage, getPostersPage, addNewPoster, getOnePoster} = require('../controllers/poster.controller')

const router = Router()

router.get('/', getPostersPage)
router.get('/add', addNewPosterPage)
router.post('/add', addNewPosterPage)
router.get('/:id', getOnePoster)

module.exports = router