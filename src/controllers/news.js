const { newNews, getAllNews, updateNews, deleteNews } = require("../models/news")

const newNewsController = async (req, res) => {
    try {
        const result = await newNews(req.body, req.auth._id)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

const getNewsController = async (req, res) => {
    try {
        const result = await getAllNews(req.query)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateNewsController = async (req, res) => {
    try {
        const result = await updateNews(req.auth._id, req.params.id, req.body)
        res.status(200).json({ msg: result })
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteNewsController = async (req, res) => {
    try {
        const result = await deleteNews(req.auth._id, req.params.id)
        res.status(200).json({ msg: result })
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = { newNewsController, getNewsController, updateNewsController, deleteNewsController }