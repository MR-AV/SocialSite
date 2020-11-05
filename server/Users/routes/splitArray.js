function splitArray(images){

    res = []
    images.forEach(post => {
            res.push({url : post.url, caption : post.caption, likes : post.likes.length, imageId: post._id, userId : post.userId, comments : post.comments.length})
        })
    return res;
}

module.exports = splitArray;