const {Router} = require('express')
const router = Router()
const {createCommunity, getAllCommunities, getCommunityPosts, getTopCommunities, getCommunityById, joinCommunityById, validateMember, removeMember} = require('../controllers/communityController')

router.get('/', getAllCommunities)
router.get('/post/:id', getCommunityPosts)
router.get('/top', getTopCommunities)
router.get('/:id', getCommunityById)
router.get('/:id/validate', validateMember)
router.post('/', createCommunity)
router.post('/:id/leave', removeMember)
router.put('/:id/join', joinCommunityById)


module.exports = router