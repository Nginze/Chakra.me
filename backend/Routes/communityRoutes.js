const {Router} = require('express')
const router = Router()

router.get('/')
router.get('/post/:id', getCommunityPosts)
router.get('/top', getTopCommunities)
router.post('/', createCommunity)



module.exports = router