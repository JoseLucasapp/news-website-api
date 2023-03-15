const { newNewsController, getNewsController, updateNewsController, deleteNewsController } = require('../controllers/news')
const auth = require('../middlewares/authMiddleware')

module.exports = (router) => {
    router.post('/news', auth, newNewsController)
    router.get('/news', auth, getNewsController)
    router.update('/news/:id', auth, updateNewsController)
    router.delete('/news/:id', auth, deleteNewsController)
}