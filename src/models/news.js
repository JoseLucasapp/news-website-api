const newsDb = require('../database/schemas/news')

const newNews = async (data, uId) => {
    const result = await newsDb.create({ ...data, userId: uId })

    return { result: result.toObject() }
}

const getAllNews = async (queryData) => {

    const filter = {}

    const pageOptions = {
        page: parseInt(queryData.page) || 0,
        limit: parseInt(queryData.limit) || 10,
    }

    if (queryData.userId) Object.assign(filter, { userId: queryData.userId })
    if (queryData._id) Object.assign(filter, { _id: queryData._id })
    if (queryData.title) Object.assign(filter, { title: { $regex: queryData.title, $options: 'i' } })

    const totalEntries = await newsDb.find(filter).count()
    const newsData = await newsDb
        .find(filter)
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit)

    const data = {
        data: newsData,
        metadata: {
            pageNumber: pageOptions.page,
            pageSize: newsData.length,
            totalEntries: totalEntries,
            totalPages: Math.ceil(totalEntries / pageOptions.limit),
        },
    }

    return data
}

const updateNews = async (uId, id, data) => await newsDb.updateOne({ _id: id, userId: uId }, { $set: data }, { upsert: true, new: true })

const deleteNews = async (uId, id) => await newsDb.deleteOne({ _id: id, userId: uId })

module.exports = { newNews, getAllNews, updateNews, deleteNews }