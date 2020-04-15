const { Image, Comment } = require('../models')

async function imageCounter() {
    const result = await Image.countDocuments();
    return result;
}

async function commentsCounter() {
    const result = await Comment.countDocuments();
    return result
}

async function imageTotalViewsCounter() {
    const result = await Image.aggregate([{
        $group: {
            _id: '1',
            viewsTotal: { $sum: '$views' }
        }
    }]);
    if (result.length > 0) {
        return result[0].viewsTotal;
    }
}

async function likesTotalCounter() {
    const result = await Image.aggregate([{
        $group: {
            _id: '1',
            likesTotal: { $sum: '$likes' }
        }
    }]);
    if (result.length > 0) {
        return result[0].likesTotal;
    }
}

module.exports = async () => {
    const results = await Promise.all([
        imageCounter(),
        commentsCounter(),
        imageTotalViewsCounter(),
        likesTotalCounter()
    ])
    return {
        images: results[0],
        comments: results[1],
        views: results[2],
        likes: results[3]
    }
}