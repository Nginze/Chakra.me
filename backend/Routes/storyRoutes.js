const {Router} = require('express')
const { createStory, getStoryById } = require('../controllers/storyController')
const router = Router()

router.post('/', createStory)
router.get('/:id',getStoryById)
module.exports = router