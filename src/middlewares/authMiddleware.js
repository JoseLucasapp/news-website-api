import { verify } from 'jsonwebtoken';
import userSchema from '../database/schemas/user'

module.exports = async (req, res, next) => {
    const [, token] = req.headers.authorization.split(' ');
    try {
        const payload = await verify(token);
        const user = await userSchema.findById(payload.user);
        if (!user) {
            res.send(401);
            return;
        }
        req.auth = user;
        next();
    } catch (err) {
        res.send(err)
    }
}