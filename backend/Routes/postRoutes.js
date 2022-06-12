const {Router} = require('express')
const router = Router()
const {getPostById, getPosts, createPost, postLike} = require('../controllers/postControllers')

router.get('/', getPosts)
router.get('/:id', getPostById)
router.post('/', createPost)
router.post('/like/:id', postLike)



module.exports = router