const { newNewsController, getNewsController, updateNewsController, deleteNewsController } = require('../controllers/news')
const auth = require('../middlewares/authMiddleware')

module.exports = (router) => {
    router.post('/news', auth, newNewsController)
    router.get('/news', auth, getNewsController)
    router.put('/news/:id', auth, updateNewsController)
    router.delete('/news/:id', auth, deleteNewsController)
}