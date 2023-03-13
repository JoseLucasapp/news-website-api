const userSchema = require('../database/schemas/user')
const { sign } = require('../config/jwt')
const login = async (email, password) => {
    const user = await userSchema.findOne({ email, password })
    const token = sign({ user: user.id })

    if (!user) {
        return 'Not found'
    }
    return { user, token }
}

const profile = async (id) => {
    return await userSchema.findOne({ id })
}

const newUser = async (data) => {
    const result = await DbSchema.create(data)
    const { password, ...user } = result.toObject()
    const token = sign({ user: user.id })

    return { user, token }
}

module.exports = { login, profile, newUser }