middlewareObj = {}

middlewareObj.isLoggedInP = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/patient/login");
}


module.exports = middlewareObj;