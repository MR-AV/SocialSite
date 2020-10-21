function splitArray(images){

    res = []
    images.forEach(element => {
        element.imageUrl.forEach(image => {
            res.push(image)
        })
    });
    return res;
}

module.exports = splitArray;