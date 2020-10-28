function splitArray(images){

    res = []
    images.forEach(element => {
        element.image.forEach(post => {
            res.push({url : post.url, caption : post.caption})
        })
    });
    return res;
}

module.exports = splitArray;