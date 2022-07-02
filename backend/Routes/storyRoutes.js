const {Router} = require('express')
const { createStory, getStoryById, addView } = require('../controllers/storyController')
const router = Router()

router.post('/', createStory)
router.get('/:id',getStoryById)
router.put('/view/:id', addView)
module.exports = router