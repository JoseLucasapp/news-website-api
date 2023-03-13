const { registryController, loginController, profileController } = require("../controllers/user")
const auth = require('../middlewares/authMiddleware')

module.exports = (router) => {
    router.post('/registry', registryController)
    router.get('/login', loginController)
    router.get('/profile', auth, profileController)
}