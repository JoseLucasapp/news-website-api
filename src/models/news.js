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

    if (queryData.userId) Object.assign(filter, { userId: { $regex: queryData.userId, $options: 'i' } })
    if (queryData.id) Object.assign(filter, { _id: { $regex: queryData.id, $options: 'i' } })
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

const updateNews = async (uId, id, data) => {
    await newsDb.updateOne({ userId: uId, _id: id }, { $set: data }).exec((err) => {
        if (err) {
            return err
        }
    })

    return "Updated"
}

const deleteNews = async (uId, id) => {
    await newsDb.deleteOne({ _id: id, userId: uId }).exec((err) => {
        if (err) {
            return err
        }
    })

    return "Deleted"
}

module.exports = { newNews, getAllNews, updateNews, deleteNews }