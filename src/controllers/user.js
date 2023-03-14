const { login, profile, newUser } = require('../models/user')

const registryController = async (req, res) => {
    try {
        const data = await newUser(req.body)
        if (data === 'email') {
            return res.status(200).json({ msg: 'Email already exists' })
        }
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
}

const loginController = async (req, res) => {
    try {
        const [, hash] = req.headers.authorization.split(' ');
        const [email, password] = Buffer.from(hash, 'base64').toString().split(':');
        const data = await login(email, password)
        if (data === '404') {
            return res.status(404).json('Not found')
        }
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
}

const profileController = async (req, res) => {
    try {
        const data = await profile(req.auth._id)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = { registryController, loginController, profileController }