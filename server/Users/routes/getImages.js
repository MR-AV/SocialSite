function splitArray(images){

    res = []
    images.forEach(element => {
        element.image.forEach(post => {
            res.push({url : post.url, caption : post.caption, likes : post.Likes})
        })
    });
    return res;
}

module.exports = splitArray;