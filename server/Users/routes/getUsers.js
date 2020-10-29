const express = require("express");
function getUserInfo(req, res){
    if(req.isAuthenticated()){
        res.send({
            authenticated: true,
            username: req.user.userName,
            userProfile: 'https://cdn-images-1.medium.com/max/1200/1*8OkdLpw_7VokmSrzwXLnbg.jpeg',
            userBackground: 'https://i.ytimg.com/vi/f600WUNFMYI/maxresdefault.jpg'
        });
    }else{
        res.send({
            authenticated: false,
            username: 'anonymous',
            userProfile: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Anonymous.svg/1200px-Anonymous.svg.png',
            userBackground: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.FyFnMYFR5lK--jGfR46m9QHaCG%26pid%3DApi&f=1'
        });
    }
}

method.exports = router;



