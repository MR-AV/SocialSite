const CLIENT_URL = "http://localhost:3000";


module.exports.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated())
        next();
    else
        res.redirect(CLIENT_URL);
}

module.exports.Authenticate = function(req, res, next) {
    if (req.isAuthenticated())
        next();
    else
        res.send({isAuthenticated : false});
}