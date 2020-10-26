function splitArray(images){

    res = []
    images.forEach(element => {
        element.image.forEach(post => {
            res.push(post.url)
        })
    });
    return res;
}

module.exports = splitArray;