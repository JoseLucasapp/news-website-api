import { registry, login } from "../controllers/user"
import auth from '../middlewares/authMiddleware'

module.exports = (router) => {
    router.post('/registry', registry)
    router.get('/login', login)
    router.get('/profile', auth, login)
}