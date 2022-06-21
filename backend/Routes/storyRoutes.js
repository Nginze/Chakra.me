const {Router} = require('express')
const { createStory } = require('../controllers/storyController')
const router = Router()

// router.get('/:id', getStoryFeed)
router.post('/', createStory)

module.exports = router