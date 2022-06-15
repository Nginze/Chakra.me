const {Router} = require('express')
const router = Router()
const {getSuggestions} = require('../controllers/suggestionController')

router.get('/', getSuggestions)

module.exports = router