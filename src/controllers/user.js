const registry = (req, res) => {
    try {
        res.status(200).json('ok')
    } catch (error) {
        res.status(500).json(error)
    }
}

const login = (req, res) => {
    try {
        res.status(200).json('ok')
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = { registry, login }