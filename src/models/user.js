const userSchema = require('../database/schemas/user')
const { sign } = require('../config/jwt')
const login = async (email, password) => {
    const user = await userSchema.findOne({ email, password }).select('-password -__v')
    const token = await sign({ user: user.id })

    if (!user) {
        return 'Not found'
    }
    return { user, token }
}

const profile = async (id) => {
    return await userSchema.findOne({ _id: id }).select('-password')
}

const newUser = async (data) => {

    const check = await userSchema.findOne({ email: data.email }).select('id')
    if (check) {
        return 'email'
    }
    const result = await userSchema.create(data)
    const { password, ...user } = result.toObject()
    const token = sign({ user: user.id })

    return { user, token }
}

module.exports = { login, profile, newUser }