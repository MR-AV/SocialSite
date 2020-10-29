function splitArray(images){

    res = []
    images.forEach(element => {
        element.image.forEach(post => {
            res.push({url : post.url, caption : post.caption, likes : post.likes.length, imageId: post._id, userId : element._id, comments : post.comments.length})
        })
    });
    return res;
}

module.exports = splitArray;